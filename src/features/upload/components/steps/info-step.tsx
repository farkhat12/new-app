"use client";
import { NumberInput, PhoneInput, PriceInput, TextInput } from "@/shared";
import { RentType } from "../fields/rent-type";
import { ForWhom } from "../fields/for-whom";
import Amenities from "../fields/amenities";

const InfoStep = () => {
  return (
    <div className="py-1 flex flex-col gap-0.5">
      <TextInput name="address" placeholder="Enter address" label="Address" />
      <TextInput
        name="orienteer"
        placeholder="Enter orienteer"
        label="Orienteer"
      />
      <section className="border flex sm:flex-row gap-2 border-transparent space-y-1 relative rounded-lg p-2 px-1 md:p-2 flex-col">
        <PriceInput name="price" />
        <PhoneInput />
        <NumberInput name="rooms" placeholder="Rooms" label="Rooms" />
      </section>
      <RentType />
      <ForWhom />
      <Amenities />
    </div>
  );
};

export default InfoStep;
