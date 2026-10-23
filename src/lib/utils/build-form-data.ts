export const buildApartmentFormData = (data: any) => {
  const formData = new FormData();

  formData.append("address", data.address);
  formData.append("orienteer", data.orienteer);
  formData.append("price", String(data.price));
  formData.append("phone", data.phone);
  formData.append("rooms", String(data.rooms));
  formData.append("rentType", data.rentType || "long");
  formData.append("forWhom", data.forWhom || "everyone");
  data.amenities.forEach((amenity: any) => {
    formData.append("amenities", amenity);
  });
  data.images.forEach((image: any) => {
    formData.append("images", image);
  });
  return formData;
};
