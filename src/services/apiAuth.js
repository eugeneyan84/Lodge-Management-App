import supabase, { supabaseUrl } from './supabase';

export const signup = async ({ fullName, email, password }) => {
  //console.log(`name: ${fullName}, email: ${email}, password: ${password}`);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  //console.log(data);

  return data;
};

export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) {
    return null;
  } else {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw new Error(error.message);
    }

    return data?.user;
  }
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

export const updateCurrentUser = async ({ fullName, password, avatar }) => {
  // 1) update pwd or fullName
  let inputData;
  if (password) {
    inputData = { password };
  }
  if (fullName) {
    inputData = { data: { fullName } };
  }
  const { data, error } = await supabase.auth.updateUser(inputData);

  if (error) {
    throw new Error(error.message);
  }

  // 2) update avatar image where available
  if (!avatar) {
    return data;
  } else {
    const avatarFilename = `avatar-${data.user.id}-${Math.random()}`;

    const { error: avatarStorageError } = await supabase.storage
      .from('avatars')
      .upload(avatarFilename, avatar);

    if (avatarStorageError) {
      throw new Error(avatarStorageError.message);
    }

    // 3) update avatar in user response
    const { data: updatedUser, error: updatedError } =
      await supabase.auth.updateUser({
        data: {
          avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${avatarFilename}`,
        },
      });

    if (updatedError) {
      throw new Error(updatedError.message);
    }

    return updatedUser;
  }
};
