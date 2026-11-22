"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import { MyApartmentCard } from "./my-apartment-card";
import { Apartment, ApartmentStatus } from "@/types/apartment.types";

interface MyApartmentsProps {
  apartments: Apartment[];
  onEdit?: (apartment: Apartment) => void;
  onDelete?: (apartment: Apartment) => void;
}

export function MyApartments({
  apartments,
  onEdit,
  onDelete,
}: MyApartmentsProps) {
  const [activeTab, setActiveTab] = useState<ApartmentStatus>("active");

  const filteredApartments = apartments.filter(
    (apartment) => apartment.status === activeTab,
  );

  return (
    <section className="space-y-4">
      {/* Heading */}
      <div className="flex items-center gap-2">
        <Building2 className="size-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold tracking-tight">My Apartments</h2>
      </div>

      {/* Tabs */}
      <div className="relative flex w-full border-b">
        {(["active", "archived"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`relative flex-1 px-4 py-3 text-sm font-medium capitalize transition-colors duration-200 sm:flex-none sm:min-w-32 ${
              activeTab === tab
                ? "text-blue-600"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}

        {/* Animated indicator */}
        <span
          className={`absolute bottom-0 h-0.5 w-1/2 bg-blue-600 transition-transform duration-300 ease-in-out sm:w-32 ${
            activeTab === "archived"
              ? "translate-x-full sm:translate-x-32"
              : "translate-x-0"
          }`}
        />
      </div>

      {/* Apartments */}
      {filteredApartments.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredApartments.map((apartment) => (
            <MyApartmentCard
              key={apartment._id}
              apartment={apartment}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed px-4 py-8 text-center">
          <Building2 className="mb-3 size-9 text-muted-foreground/50" />

          <p className="text-sm font-medium">No {activeTab} apartments</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Your {activeTab} apartments will appear here.
          </p>
        </div>
      )}
    </section>
  );
}
