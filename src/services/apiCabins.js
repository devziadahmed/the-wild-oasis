import toast from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  try {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
      throw new Error(error);
    }

    return data;
  } catch (error) {
    throw new Error("Error getting cabins", error.message || error);
  }
}

async function uploadImage(image) {
  const imageName = `${image.name}-${Math.random()}`.replaceAll("/", "");

  const uploadingPromise = supabase.storage.from("cabin-images").upload(imageName, image);

  try {
    const { error } = await toast.promise(uploadingPromise, {
      loading: "Uploading image...",
      success: "Uploading done",
      error: "Uploading failed",
    });

    if (error) throw error;
    return `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  } catch (error) {
    throw new Error("uploadImage() : Failed uploading image", error.message);
  }
}

export async function createCabin(newCabin) {
  const { image } = newCabin;

  const hasImagePath = image.startsWith?.(supabaseUrl);

  const imagePath = hasImagePath ? image : await uploadImage(image);

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Cabin cannot be created");
  }

  return data;
}

export async function editCabin(updatedCabin) {
  const imagePath =
    typeof updatedCabin.image === "string"
      ? updatedCabin.image
      : await uploadImage(updatedCabin.image[0]);

  try {
    const { data, error } = await supabase
      .from("cabins")
      .update({ ...updatedCabin, image: imagePath })
      .eq("id", updatedCabin.id)
      .select();

    if (error) {
      throw new Error(error);
    }
    return data;
  } catch (error) {
    throw new Error("Error editing cabin", error.message);
  }
}

export async function deleteCabin(id) {
  try {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
      throw new Error(error);
    }
  } catch (error) {
    throw new Error("Error deleting cabin", error.message);
  }
}
