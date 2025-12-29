import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Star, Users, Lock, Layers } from "lucide-react";
import { Link } from "react-router-dom";

export interface GroupLabCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  isFree: boolean;
  price?: number;
  duration: string;
  labsCount: number;
  rating: number;
  enrolledCount: number;
}

export function GroupLabCard({
  id,
  title,
  description,
  thumbnail,
  isFree,
  price,
  duration,
  labsCount,
  rating,
  enrolledCount,
}: GroupLabCardProps) {
  return (
    <Card variant="elevated" className="overflow-hidden group border-2 border-primary/10">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={isFree ? "free" : "paid"}>
            {isFree ? "FREE" : `$${price}`}
          </Badge>
          <Badge variant="secondary" className="bg-primary text-primary-foreground">
            <Layers className="w-3 h-3 mr-1" />
            {labsCount} Labs Bundle
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
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-premium text-premium" />
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{duration}</span>
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
            <Layers className="w-3.5 h-3.5" />
            <span>{labsCount} labs included</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{enrolledCount.toLocaleString()} enrolled</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link to={`/group-labs/${id}`} className="w-full">
          <Button 
            variant={isFree ? "success" : "premium"} 
            className="w-full"
          >
            {isFree ? "Start Bundle" : "View Bundle"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
