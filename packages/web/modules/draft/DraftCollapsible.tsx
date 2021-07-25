import React, { useState } from "react";
import { MdAdd, MdArrowDropDown, MdMoreHoriz } from "react-icons/md";
import { Button } from "../../components/Button";
import { Journal } from "../../lib/types";
import { DraftList } from "./DraftList";
import { useNewDraft } from "./useNewDraft";

interface DraftCollapsibleProps {
  journal: Journal;
}

export const DraftCollapsible: React.FC<DraftCollapsibleProps> = ({
  journal,
}) => {
  const [open, setOpen] = useState(false);
  const newDraft = useNewDraft();

  return (
    <div key={journal.id} className="mt-3">
      <div className="group flex items-center justify-between h-6">
        <Button
          onClick={() => setOpen(!open)}
          icon={
            <MdArrowDropDown
              className={`w-6 h-6 ${open ? "" : "-rotate-90"}`}
            />
          }
          color="transparent"
          size="none"
          noAnimate
        >
          {journal.name}
        </Button>
        <div className="hidden group-hover:flex items-center space-x-2">
          <Button
            icon={<MdMoreHoriz className="w-5 h-5 text-gray-500" />}
            size="xsmall"
            color="transparent"
          />
          <Button
            onClick={() => newDraft(journal.id)}
            icon={<MdAdd className="w-5 h-5 text-gray-500" />}
            size="xsmall"
            color="transparent"
          />
        </div>
      </div>
      {open && <DraftList journal={journal} />}
    </div>
  );
};