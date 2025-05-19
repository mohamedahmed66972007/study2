import React from "react";
import { SUBJECTS } from "@/lib/constants";
import { Subject, FiltersAction } from "@/lib/types";
import { cn } from "@/lib/utils"; // Assuming cn is a classnames utility

interface SubjectTabsProps {
  activeSubject: string | null;
  onSelectSubject: (subject: string | null) => void;
}

const SubjectTabs: React.FC<SubjectTabsProps> = ({ activeSubject, onSelectSubject }) => {
  return (
    <div className="mb-6" id="subjects">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4 space-x-reverse overflow-x-auto" aria-label="Tabs">
          <button
            className={`${
              activeSubject === null
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            } whitespace-nowrap py-2 px-1 font-normal text-xs`}
            onClick={() => onSelectSubject(null)}
          >
            الكل
          </button>

          {SUBJECTS.map((subject) => (
            <button
              key={subject.id}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                subject.id === activeSubject
                  ? "text-foreground font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => onSelectSubject(subject.id)}
              title={subject.id === "grade11" ? "الصف الحادي عشر" : undefined}
            >
              <span className="flex items-center gap-1">
                <span className={cn(
                  "w-2 h-2 rounded-full ml-2",
                  subject.id === "arabic" && "bg-blue-500",
                  subject.id === "english" && "bg-orange-500",
                  subject.id === "math" && "bg-green-500",
                  subject.id === "biology" && "bg-emerald-500",
                  subject.id === "chemistry" && "bg-purple-500",
                  subject.id === "physics" && "bg-red-500",
                  subject.id === "islamic" && "bg-teal-500",
                  subject.id === "constitution" && "bg-yellow-500",
                  subject.id === "grade11" && "bg-gray-500"
                )}
              />
              <span className={cn(
                activeSubject === subject.id && subject.id === "arabic" && "text-blue-500",
                activeSubject === subject.id && subject.id === "english" && "text-orange-500",
                activeSubject === subject.id && subject.id === "math" && "text-green-500",
                activeSubject === subject.id && subject.id === "biology" && "text-emerald-500",
                activeSubject === subject.id && subject.id === "chemistry" && "text-purple-500",
                activeSubject === subject.id && subject.id === "physics" && "text-red-500",
                activeSubject === subject.id && subject.id === "islamic" && "text-teal-500"
              )}>
                {subject.name}
              </span>
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SubjectTabs;
