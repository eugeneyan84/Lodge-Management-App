import supabase from './supabase';

export const getLodges = async () => {
  const { data, error } = await supabase.from('lodges').select('*');

  if (error) {
    console.error(error);
    throw new Error('Lodges could not be loaded');
  }

  return data;
};
