import axios from 'axios';

export async function getAnnouncements() {
    const resp = await axios.get(`/announcements/api/announcements`);
    return resp.data || null;
}
