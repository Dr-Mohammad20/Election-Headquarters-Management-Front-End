import React, { useState, useEffect } from 'react';
import styles from '../styles/AdminPanel.module.css';
import Image from 'next/image';
import Pic from '../assets/Images/pic.jpg';
import { useRouter } from 'next/navigation';

import InsertMembers from '@/components/InsertMembers';
import AllMembers from '@/components/AllMembers';

const adminPanel = () => {
  const [display, setDisplay] = useState('newMember');
  const router = useRouter();

  const newMemberClickHandler = () => {
    setDisplay('newMember');
  };
  const allMemberClickHandler = () => {
    setDisplay('allMembers');
  };
  useEffect(() => {
    const Acepted = localStorage.getItem('userAcepted');
    if (Acepted !== 'true') router.push('/');
  });

  return (
    <div className={styles.Main}>
      <div className={styles.Container}>
        <div className={styles.SiteHeader}>
          <Image className={styles.Image} src={Pic} alt="pic" width={0} />
          <p>سامانه پایش ستاد انتخاباتی ...</p>
        </div>
        <div className={styles.Menu}>
          <button onClick={newMemberClickHandler}>افزودن عضو</button>
          <button onClick={allMemberClickHandler}>مشاهده اعضا</button>
        </div>
        <div className={styles.MainDiv}>
          {display === 'newMember' && <InsertMembers />}
          {display === 'allMembers' && <AllMembers />}
        </div>
      </div>
    </div>
  );
};

export default adminPanel;
