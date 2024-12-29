import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AvatarIconProps = {
  photographerName: string;
  photographerUrl: string;
};

const AvatarIcon: React.FC<AvatarIconProps> = ({ photographerName, photographerUrl }) => (
  <div className="flex gap-2 justify-around items-center">
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <div className="flex justify-start items-start flex-col">
      <span>{photographerName}</span>
      <a
        href={photographerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 text-sm font-medium"
      >
        @{photographerName}
      </a>
    </div>
  </div>
);

export default AvatarIcon;