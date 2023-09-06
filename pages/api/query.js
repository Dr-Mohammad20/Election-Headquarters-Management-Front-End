import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const getMembers = async () => {
  const response = await axios.get(`${BASE_URL}/getMembers`);
  return response.data;
};

const updateMember = async (
  id,
  fullName,
  fatherName,
  phone,
  work,
  semat,
  mantagheh
) => {
  axios.put(`${BASE_URL}/updateMember`, {
    id: id,
    fullName: fullName,
    fatherName: fatherName,
    phone: phone,
    work: work,
    semat: semat,
    mantagheh: mantagheh,
  });
};

const deleteMember = (id) => {
  axios.delete(`${BASE_URL}/deleteMember/${id}`);
};

const insertMember = (fullName, fatherName, phone, work, semat, mantagheh) => {
  axios.post(`${BASE_URL}/InsertNewMember`, {
    fullName: fullName,
    fatherName: fatherName,
    phone: phone,
    work: work,
    semat: semat,
    mantagheh: mantagheh,
  });
};

export { getMembers, insertMember, updateMember, deleteMember };
