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

export const createEditLodge = async (lodgeRecord, id) => {
  console.log(lodgeRecord);
  const hasImgPath = lodgeRecord.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${lodgeRecord.image.name}`.replaceAll(
    '/',
    ''
  );
  const imgPath = `${supabaseUrl}/storage/v1/object/public/lodge-images/${imageName}`;
  console.log(lodgeRecord);

  const {
    name,
    maxCapacity: max_capacity,
    regularPrice: regular_price,
    discount,
    description,
  } = lodgeRecord;

  const dbRecord = {
    name,
    max_capacity,
    regular_price,
    discount,
    description,
    image_url: hasImgPath ? lodgeRecord.image : imgPath,
  };

  let query = supabase.from('lodges');

  // create
  if (!id) {
    query = query.insert([dbRecord]);
  } else {
    query = query.update(dbRecord).eq('id', id);
  }

  const { data, error } = await query.select().single();

  console.log(data);
  if (error) {
    console.error(error);
    throw new Error(`Lodge could not be created - ${error.message}`);
  }

  //const avatarFile = event.target.files[0]
  if (!hasImgPath) {
    console.log('Prior image-path not detected, attempting to upload image');
    const { error: storageError } = await supabase.storage
      .from('lodge-images')
      .upload(imageName, lodgeRecord.image);

    if (storageError) {
      await supabase.from('lodges').delete().eq('id', data.id);
      console.error(storageError);
      throw new Error(
        `Lodge image could not be uploaded, new lodge not created - ${storageError.message}`
      );
    }
  } else {
    console.log('Prior image-path detected, not performing image upload');
  }

  return data;
};
