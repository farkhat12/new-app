"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { ApartmentStatus } from "@/types/apartment.types";

const TABS: { value: ApartmentStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "archived", label: "Archived" },
];

export function ApartmentTabs() {
  const [tab, setTab] = useState<ApartmentStatus>("active");

  return (
    <section aria-labelledby="apartments-heading" className="space-y-1">
      <h2
        id="apartments-heading"
        className="text-lg font-semibold tracking-tight"
      >
        My apartments
      </h2>

      <Tabs value={tab} onValueChange={(v) => setTab(v as ApartmentStatus)}>
        <TabsList className="grid w-full grid-cols-2 sm:w-64">
          {TABS.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              className={"cursor-pointer"}
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((t) => (
          <TabsContent
            key={t.value}
            value={t.value}
            className="mt-5"
          ></TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
