import supabase, { supabaseUrl } from './supabase';

export const getLodges = async () => {
  const { data, error } = await supabase.from('lodges').select('*');

  if (error) {
    console.error(error);
    throw new Error('Lodges could not be loaded');
  }

  return data;
};

export const deleteLodge = async (id) => {
  const { data, error } = await supabase.from('lodges').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error(`Lodges could not be deleted - ${error.message}`);
  }

  return data;
};

export const createLodge = async (newLodge) => {
  const imageName = `${Math.random()}-${newLodge.image.name}`.replaceAll(
    '/',
    ''
  );
  const imgPath = `${supabaseUrl}/storage/v1/object/public/lodge-images/${imageName}`;

  const {
    name,
    maxCapacity: max_capacity,
    regularPrice: regular_price,
    discount,
    description,
  } = newLodge;
  const { data, error } = await supabase
    .from('lodges')
    .insert([
      {
        name,
        max_capacity,
        regular_price,
        discount,
        description,
        image_url: imgPath,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error(`Lodge could not be created - ${error.message}`);
  }

  //const avatarFile = event.target.files[0]
  const { error: storageError } = await supabase.storage
    .from('lodge-images')
    .upload(imageName, newLodge.image);

  if (storageError) {
    await supabase.from('lodges').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      `Lodge image could not be uploaded, new lodge not created - ${storageError.message}`
    );
  }

  return data;
};
