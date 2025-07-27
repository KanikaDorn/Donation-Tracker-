import React from "react";
import { Campaign } from "../types";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Calendar, Users, DollarSign } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CampaignCardProps extends React.ComponentPropsWithoutRef<"div"> {
  campaign: Campaign;
  onViewDetails: (campaign: Campaign) => void;
  onDonate: (campaignId: string) => void;
}

export function CampaignCard({
  campaign,
  onViewDetails,
  onDonate,
}: CampaignCardProps) {
  const progressPercentage = (campaign.currentAmount / campaign.goal) * 100;
  const daysLeft = Math.ceil(
    (campaign.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-white/20">
      <div className="relative">
        <ImageWithFallback
          src={campaign.imageUrl}
          alt={campaign.title}
          className="w-full h-48 object-cover"
        />
        {campaign.featured && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white">
            Featured
          </Badge>
        )}
        <Badge
          variant="secondary"
          className="absolute top-3 right-3 bg-white/90"
        >
          {campaign.category}
        </Badge>
      </div>

      <CardContent className="p-6">
        <h3 className="mb-2 line-clamp-2">{campaign.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
          {campaign.shortDescription}
        </p>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-medium">
                {progressPercentage.toFixed(0)}%
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="font-medium">
                ${campaign.currentAmount.toLocaleString()}
              </span>
              <span className="text-gray-500">
                of ${campaign.goal.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{campaign.donors.length} donors</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span className={daysLeft < 7 ? "text-red-600 font-medium" : ""}>
                {daysLeft > 0 ? `${daysLeft} days left` : "Campaign ended"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 space-x-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onViewDetails(campaign)}
        >
          View Details
        </Button>
        <Button
          className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
          onClick={() => onDonate(campaign.id)}
          disabled={daysLeft <= 0}
        >
          Donate Now
        </Button>
      </CardFooter>
    </Card>
  );
}
