import axios from 'axios';

/**
 * Returns An object containing breakfast, dinner and supper contents
 * @param date ISO formatted date
 */
export async function getMenuForDate(date) {
    const resp = await axios.get(`/menu/api/menu-days/?date=${date}`);
    return resp.data[0] || null;
}
