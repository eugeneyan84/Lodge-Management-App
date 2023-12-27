import supabase from './supabase';

import { getToday } from '../utils/helpers';
import { PAGE_SIZE } from '../utils/constants';

export const getBookings = async ({ filter, sortBy, page = 1 }) => {
  console.log(`getBookings start`);
  let query = supabase
    .from('bookings')
    .select(
      'id, created_at, start_date, end_date, num_nights, num_guests, status, total_price, lodges(name), guests(full_name, email)',
      { count: 'exact' }
    );

  if (filter) {
    console.log(`[getBookings] filter by ${filter.field} ${filter.value}`);
    query = query.eq(filter.field, filter.value);
  }

  if (sortBy) {
    console.log(`[getBookings] sort by ${sortBy.field} ${sortBy.direction}`);
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });
  }

  if (page) {
    const start = (page - 1) * PAGE_SIZE;
    const end = page * PAGE_SIZE - 1;
    query = query.range(start, end);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return { data, count };
};

export const getBooking = async (id) => {
  console.log(id);
  const { data, error } = await supabase
    .from('bookings')
    .select('*, lodges(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
};

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// supabase expects date parameter to be an ISO string
export const getBookingsAfterDate = async (date) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, total_price, extras_price')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return data;
};

// Returns all STAYS that are were created after the given date
export const getStaysAfterDate = async (date) => {
  const { data, error } = await supabase
    .from('bookings')
    // .select('*')
    .select('*, guests(full_name)')
    .gte('start_date', date)
    .lte('start_date', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return data;
};

// Activity means that there is a check in or a check out today
export const getStaysTodayActivity = async () => {
  console.log(`getStaysTodayActivity start`);
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(full_name, nationality, country_flag)')
    .or(
      `and(status.eq.unconfirmed,start_date.eq.${getToday()}),and(status.eq.checked-in,end_date.eq.${getToday()})`
    )
    .order('created_at');

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  console.log(data);
  return data;
};

export const updateBooking = async (id, obj) => {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
};

export const deleteBooking = async (id) => {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
};
