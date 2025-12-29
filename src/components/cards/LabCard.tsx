import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Star, Users, Lock, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

export interface LabCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  isFree: boolean;
  price?: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  rating: number;
  enrolledCount: number;
  platform?: string;
}

const levelColors = {
  Beginner: "bg-success-light text-success",
  Intermediate: "bg-blue-100 text-blue-700",
  Advanced: "bg-orange-100 text-orange-700",
  Expert: "bg-red-100 text-red-700",
};

export function LabCard({
  id,
  title,
  description,
  thumbnail,
  isFree,
  price,
  duration,
  level,
  rating,
  enrolledCount,
}: LabCardProps) {
  return (
    <Card variant="elevated" className="overflow-hidden group">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={isFree ? "free" : "paid"}>
            {isFree ? "FREE" : `$${price}`}
          </Badge>
        </div>
        {!isFree && (
          <div className="absolute top-3 right-3">
            <div className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <Lock className="w-4 h-4 text-premium" />
            </div>
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="level" className={levelColors[level]}>
            {level}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-premium text-premium" />
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{enrolledCount.toLocaleString()} enrolled</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{level}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link to={`/labs/${id}`} className="w-full">
          <Button 
            variant={isFree ? "success" : "default"} 
            className="w-full"
          >
            {isFree ? "Start Now" : "View Details"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
