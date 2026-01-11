import { useMemo } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { FileText, Video, Code2, HelpCircle, Puzzle, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import type { ContentBlock, ContentBlockType } from "./types";
import { SortableItemShell } from "./SortableItemShell";

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

const palette: {
  type: ContentBlockType;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { type: "text", title: "Text Block", description: "Rich text content", icon: FileText },
  { type: "video", title: "Video Embed", description: "Youtube/Vimeo URL", icon: Video },
  { type: "code", title: "Code Challenge", description: "Starter code + points", icon: Code2 },
  { type: "quiz", title: "Quiz / MCQ", description: "Single/multi choice", icon: HelpCircle },
  { type: "puzzle", title: "Puzzle / Task", description: "Instructions & tasks", icon: Puzzle },
];

export function createBlock(type: ContentBlockType): ContentBlock {
  const base = {
    id: uid(type),
    type,
    title:
      type === "text"
        ? "New text block"
        : type === "video"
          ? "New video lesson"
          : type === "code"
            ? "New code challenge"
            : type === "quiz"
              ? "New quiz"
              : "New puzzle",
    access: "free" as const,
    collapsed: false,
  };

  switch (type) {
    case "text":
      return { ...base, type, body: "" };
    case "video":
      return { ...base, type, provider: "url", url: "" };
    case "code":
      return {
        ...base,
        type,
        language: "python",
        starterCode: "# Write your solution here\n",
        points: 10,
      };
    case "quiz":
      return {
        ...base,
        type,
        question: "",
        options: [
          { id: uid("opt"), text: "Option A", correct: true },
          { id: uid("opt"), text: "Option B", correct: false },
        ],
      };
    case "puzzle":
      return { ...base, type, instructions: "" };
  }
}

export default function ContentBuilder({
  value,
  onChange,
  title = "Content Builder",
  className,
}: {
  value: ContentBlock[];
  onChange: (next: ContentBlock[]) => void;
  title?: string;
  className?: string;
}) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const ids = useMemo(() => value.map((b) => b.id), [value]);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = value.findIndex((b) => b.id === active.id);
    const newIndex = value.findIndex((b) => b.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    onChange(arrayMove(value, oldIndex, newIndex));
  };

  const add = (type: ContentBlockType) => {
    onChange([...value, createBlock(type)]);
  };

  const patch = (id: string, patcher: (b: ContentBlock) => ContentBlock) => {
    onChange(value.map((b) => (b.id === id ? patcher(b) : b)));
  };

  const remove = (id: string) => {
    onChange(value.filter((b) => b.id !== id));
  };

  return (
    <div className={cn("grid grid-cols-3 gap-6", className)}>
      <div className="col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">Drag to reorder. Use lock to mark premium-only.</p>
          </div>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {value.map((block) => (
                <SortableItemShell
                  key={block.id}
                  id={block.id}
                  title={
                    <Input
                      value={block.title}
                      onChange={(e) => patch(block.id, (b) => ({ ...b, title: e.target.value }))}
                      className="h-8"
                      aria-label="Block title"
                    />
                  }
                  subtitle={
                    block.type === "text"
                      ? "Text"
                      : block.type === "video"
                        ? "Video"
                        : block.type === "code"
                          ? "Code"
                          : block.type === "quiz"
                            ? "Quiz"
                            : "Puzzle"
                  }
                  access={block.access}
                  collapsed={block.collapsed}
                  onToggleCollapsed={() => patch(block.id, (b) => ({ ...b, collapsed: !b.collapsed }))}
                  onToggleAccess={() =>
                    patch(block.id, (b) => ({ ...b, access: b.access === "free" ? "premium" : "free" }))
                  }
                  onDelete={() => remove(block.id)}
                >
                  {block.type === "text" ? (
                    <Textarea
                      value={block.body}
                      onChange={(e) => patch(block.id, (b) => ({ ...(b as any), body: e.target.value }))}
                      placeholder="Write content..."
                      className="min-h-[120px]"
                    />
                  ) : null}

                  {block.type === "video" ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Video source</div>
                        <Select
                          value={block.provider}
                          onValueChange={(v) =>
                            patch(block.id, (b) => ({ ...(b as any), provider: v as any }))
                          }
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="url">URL embed</SelectItem>
                            <SelectItem value="upload" disabled>
                              Upload (API later)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex gap-2">
                        <Input
                          value={block.url}
                          onChange={(e) => patch(block.id, (b) => ({ ...(b as any), url: e.target.value }))}
                          placeholder="https://www.youtube.com/watch?v=..."
                        />
                        <Button type="button" variant="outline">
                          Fetch
                        </Button>
                      </div>

                      <div className="aspect-video rounded-lg border bg-muted/20 flex items-center justify-center text-sm text-muted-foreground">
                        Preview (connect embed later)
                      </div>
                    </div>
                  ) : null}

                  {block.type === "code" ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs font-medium uppercase text-muted-foreground">Language</div>
                          <Select
                            value={block.language}
                            onValueChange={(v) =>
                              patch(block.id, (b) => ({ ...(b as any), language: v as any }))
                            }
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="python">Python</SelectItem>
                              <SelectItem value="javascript">JavaScript</SelectItem>
                              <SelectItem value="typescript">TypeScript</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <div className="text-xs font-medium uppercase text-muted-foreground">Points</div>
                          <Input
                            type="number"
                            className="mt-1"
                            value={block.points}
                            onChange={(e) =>
                              patch(block.id, (b) => ({ ...(b as any), points: Number(e.target.value || 0) }))
                            }
                          />
                        </div>
                      </div>

                      <Textarea
                        value={block.starterCode}
                        onChange={(e) => patch(block.id, (b) => ({ ...(b as any), starterCode: e.target.value }))}
                        className="min-h-[140px] font-mono"
                      />
                    </div>
                  ) : null}

                  {block.type === "quiz" ? (
                    <div className="space-y-3">
                      <div className="text-sm font-medium">Question</div>
                      <Textarea
                        value={block.question}
                        onChange={(e) => patch(block.id, (b) => ({ ...(b as any), question: e.target.value }))}
                        className="min-h-[80px]"
                      />

                      <div className="text-sm font-medium">Options</div>
                      <div className="space-y-2">
                        {block.options.map((opt) => (
                          <div key={opt.id} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={opt.correct}
                              onChange={(e) =>
                                patch(block.id, (b) => ({
                                  ...(b as any),
                                  options: (b as any).options.map((o: any) =>
                                    o.id === opt.id ? { ...o, correct: e.target.checked } : o
                                  ),
                                }))
                              }
                            />
                            <Input
                              value={opt.text}
                              onChange={(e) =>
                                patch(block.id, (b) => ({
                                  ...(b as any),
                                  options: (b as any).options.map((o: any) =>
                                    o.id === opt.id ? { ...o, text: e.target.value } : o
                                  ),
                                }))
                              }
                            />
                          </div>
                        ))}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          patch(block.id, (b) => ({
                            ...(b as any),
                            options: [...(b as any).options, { id: uid("opt"), text: "New option", correct: false }],
                          }))
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add option
                      </Button>
                    </div>
                  ) : null}

                  {block.type === "puzzle" ? (
                    <div className="space-y-3">
                      <div className="text-sm font-medium">Instructions</div>
                      <Textarea
                        value={block.instructions}
                        onChange={(e) =>
                          patch(block.id, (b) => ({ ...(b as any), instructions: e.target.value }))
                        }
                        className="min-h-[120px]"
                        placeholder="Describe the task/puzzle..."
                      />
                    </div>
                  ) : null}
                </SortableItemShell>
              ))}

              <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                  <div className="text-sm text-muted-foreground">Add another block from the right panel</div>
                </CardContent>
              </Card>
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <div>
        <Card className="border shadow-sm sticky top-6">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-primary mb-4">Content Modules</h3>
            <div className="space-y-2">
              {palette.map((p) => (
                <button
                  key={p.type}
                  type="button"
                  onClick={() => add(p.type)}
                  className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors text-left"
                >
                  <p.icon className={cn("w-5 h-5", p.type === "puzzle" ? "text-accent" : "text-primary")} />
                  <div>
                    <p className="font-medium text-sm">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{p.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground">
                Backend tip: when you connect APIs, store roles in a separate roles table and validate permissions server-side.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
