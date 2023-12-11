import supabase from './supabase';

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
    throw new Error('Lodges could not be loaded');
  }

  if (error) {
    console.error(error);
    throw new Error('Lodge could not be deleted');
  }

  return data;
};
