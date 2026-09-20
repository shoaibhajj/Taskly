import EpicsIcon from "@/app/icons/EpicsIcon.svg";
import TasksIcon from "@/app/icons/TasksIcon.svg";
import MembersIcon from "@/app/icons/MembersIcon.svg";
import DetailsIcon from "@/app/icons/DetailsIcon.svg";
import Projects from "@/app/icons/Projects.svg";
import { ReactNode } from "react";
const Item = ({ children, label }: { children: ReactNode; label: string }) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-0.5">
      {children}
      <p className="text-label-xs font-semibold">{label}</p>
    </div>
  );
};

function BottomNavBar() {
  return (
    <div className="bg-surface-low  bottom-0 fixed flex h-16 w-full items-center px-7 md:hidden">
      <Item label="Projects">
        <Projects className="h-4.5 w-4.5" />
      </Item>
      <Item label="Epics">
        <EpicsIcon className="h-4.5 w-5" />
      </Item>
      <Item label="Tasks">
        <TasksIcon className="h-4.5 w-5" />
      </Item>
      <Item label="Members">
        <MembersIcon className="h-4.5 w-5.5" />
      </Item>
      <Item label="Details">
        <DetailsIcon className="h-4.5 w-5" />
      </Item>
    </div>
  );
}

export default BottomNavBar;
