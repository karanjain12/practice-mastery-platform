import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Star, Users, Lock } from "lucide-react";
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
    <Card variant="elevated" className="overflow-hidden group w-[280px] flex-shrink-0">
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={isFree ? "free" : "paid"}>
            {isFree ? "FREE" : `$${price}`}
          </Badge>
        </div>
        {!isFree && (
          <div className="absolute top-3 right-3">
            <div className="w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-md">
              <Lock className="w-4 h-4 text-secondary" />
            </div>
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="level" className="text-xs">
            {level}
          </Badge>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-secondary text-secondary" />
            <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
          </div>
        </div>
        <h3 className="text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-tight">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{enrolledCount.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link to={`/labs/${id}`} className="w-full">
          <Button 
            variant={isFree ? "success" : "secondary"} 
            className="w-full"
            size="sm"
          >
            {isFree ? "Start Now" : "View Details"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}