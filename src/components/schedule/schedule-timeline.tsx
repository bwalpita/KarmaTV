"use client";

import { useState } from "react";
import { ScheduleSlot } from "./schedule-slot";

type SlotView = {
  id: number;
  startTime: string;
  endTime: string;
  title: string;
  isRepeat: boolean;
};

export function ScheduleTimeline({
  slotsByDay,
  dayLabels,
  todayIndex,
  nowMinutes,
  locale,
  labels,
}: {
  slotsByDay: Record<number, SlotView[]>;
  dayLabels: string[];
  todayIndex: number;
  nowMinutes: number;
  locale: string;
  labels: { today: string; nowPlaying: string; repeat: string; noPrograms: string };
}) {
  const [activeDay, setActiveDay] = useState(todayIndex);
  const slots = slotsByDay[activeDay] ?? [];

  return (
    <div>
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {dayLabels.map((label, day) => (
          <button
            key={day}
            type="button"
            onClick={() => setActiveDay(day)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeDay === day
                ? "bg-brand-maroon text-text-inverse"
                : "bg-surface-cream text-text-secondary hover:bg-brand-saffron/20"
            }`}
          >
            {label}
            {day === todayIndex && ` · ${labels.today}`}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-brand-maroon/10 bg-surface-white shadow-sm">
        {slots.length === 0 ? (
          <p className="p-8 text-center text-text-tertiary">
            {labels.noPrograms}
          </p>
        ) : (
          slots.map((slot) => {
            const [sh, sm] = slot.startTime.split(":").map(Number);
            const [eh, em] = slot.endTime.split(":").map(Number);
            const isNow =
              activeDay === todayIndex &&
              nowMinutes >= sh * 60 + sm &&
              nowMinutes < eh * 60 + em;
            return (
              <ScheduleSlot
                key={slot.id}
                startTime={slot.startTime}
                title={slot.title}
                isNow={isNow}
                isRepeat={slot.isRepeat}
                locale={locale}
                nowLabel={labels.nowPlaying}
                repeatLabel={labels.repeat}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
