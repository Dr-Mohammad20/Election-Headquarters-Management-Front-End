import { insertMember } from '@/pages/api/query';
import styles from '../styles/AdminPanel.module.css';

import React, { useState } from 'react';

const InsertMembers = () => {
  //Insert New Member
  const [newMember, setNewMember] = useState([]);
  const changeHandler = (event) => {
    setNewMember({ ...newMember, [event.target.name]: event.target.value });
  };
  const addNewMemberHandler = () => {
    if (
      !newMember.fullName ||
      !newMember.fatherName ||
      !newMember.phone ||
      !newMember.work ||
      !newMember.semat ||
      !newMember.mantagheh
    ) {
      console.log('لطفا اطلاعات عضو را به صورت کامل وارد کنید');
    } else {
      const fullName = newMember.fullName;
      const fatherName = newMember.fatherName;
      const phone = newMember.phone;
      const work = newMember.work;
      const semat = newMember.semat;
      const mantagheh = newMember.mantagheh;

      insertMember(fullName, fatherName, phone, work, semat, mantagheh);
      setNewMember({
        fullName: '',
        fatherName: '',
        phone: '',
        work: '',
        semat: '',
        mantagheh: '',
      });
    }
  };

  return (
    <div className={styles.MainDivContainer}>
      <div>
        <label className={styles.Label}>نام و نام خانوادگی</label>
        <input
          className={styles.Input}
          type="text"
          name="fullName"
          value={newMember.fullName}
          onChange={changeHandler}
        />
      </div>
      <div>
        <label className={styles.Label}>نام پدر</label>
        <input
          className={styles.Input}
          type="text"
          name="fatherName"
          value={newMember.fatherName}
          onChange={changeHandler}
        />
      </div>
      <div>
        <label className={styles.Label}>تلفن تماس</label>
        <input
          className={styles.Input}
          type="text"
          name="phone"
          value={newMember.phone}
          onChange={changeHandler}
        />
      </div>
      <div>
        <label className={styles.Label}>شغل</label>
        <input
          className={styles.Input}
          type="text"
          name="work"
          value={newMember.work}
          onChange={changeHandler}
        />
      </div>
      <div>
        <label className={styles.Label}>سمت در ستاد</label>
        <input
          className={styles.Input}
          type="text"
          name="semat"
          value={newMember.semat}
          onChange={changeHandler}
        />
      </div>
      <div>
        <label className={styles.Label}>منطقه تحت پوشش</label>
        <input
          className={styles.Input}
          type="text"
          name="mantagheh"
          value={newMember.mantagheh}
          onChange={changeHandler}
        />
      </div>
      <div>
        <button className={styles.Button} onClick={addNewMemberHandler}>
          ثبت اطلاعات
        </button>
      </div>
    </div>
  );
};

export default InsertMembers;
