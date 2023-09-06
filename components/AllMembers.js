import React, { useState, useEffect } from 'react';
import { getMembers, deleteMember, updateMember } from '@/pages/api/query';
import styles from '../styles/AdminPanel.module.css';

const AllMembers = () => {
  const [selecetedMember, setSelectedMember] = useState([]);
  const [searchMember, setSearchMember] = useState([]);
  const [phoneSearch, setPhoneSearch] = useState('');
  const [nameSearch, setNameSearch] = useState('');

  const [data, setData] = useState([]);
  const loadData = async () => {
    setData(await getMembers());
  };
  useEffect(() => {
    loadData();
  }, [data]);

  const changeHandler = (event) => {
    setSelectedMember({
      ...selecetedMember,
      [event.target.name]: event.target.value,
    });
  };

  const serachHandler = (event) => {
    if (event.target.name === 'SearchByName') {
      if (data.length > 0 && nameSearch.length > 0) {
        let filteredResult = data.filter(
          (member) => member.fullName === nameSearch
        );
        setSearchMember(filteredResult);
      }
    }
    if (event.target.name === 'SearchByPhone') {
      if (data.length > 0 && phoneSearch.length > 0) {
        let filteredResult = data.filter(
          (member) => member.phone === phoneSearch
        );
        setSearchMember(filteredResult);
      }
    }
  };

  const allMemberHandler = () => {
    setSearchMember('');
    setNameSearch('');
    setPhoneSearch('');
  };
  const searchChangeHandler = (event) => {
    {
      event.target.name === 'phoneSearch' && setPhoneSearch(event.target.value);
    }
    {
      event.target.name === 'nameSearch' && setNameSearch(event.target.value);
    }
  };

  const SelectHandler = (item) => {
    setSelectedMember({
      id: item.id,
      fullName: item.fullName,
      fatherName: item.fatherName,
      phone: item.phone,
      work: item.work,
      semat: item.semat,
      mantagheh: item.mantagheh,
    });
  };

  const deleteHandler = () => {
    if (!selecetedMember.id) {
      console.log('لطفا عضو مورد نظر را برای حذف انتخاب کنید');
    } else {
      deleteMember(selecetedMember.id);
      setSelectedMember({
        id: '',
        fullName: '',
        fatherName: '',
        phone: '',
        work: '',
        semat: '',
        mantagheh: '',
      });
    }
  };

  const updateHandler = () => {
    if (
      !selecetedMember.fullName ||
      !selecetedMember.fatherName ||
      !selecetedMember.phone ||
      !selecetedMember.work ||
      !selecetedMember.semat ||
      !selecetedMember.mantagheh
    ) {
      console.log('لطفا عضو مورد نظر را برای به روز رسانی انتخاب کنید');
    } else {
      updateMember(
        selecetedMember.id,
        selecetedMember.fullName,
        selecetedMember.fatherName,
        selecetedMember.phone,
        selecetedMember.work,
        selecetedMember.semat,
        selecetedMember.mantagheh
      );
      setSelectedMember({
        id: '',
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
    <div className={styles.MembersContainer}>
      <div className={styles.updateSection}>
        <div className={styles.InputContainer}>
          <label>نام و نام خانوادگی</label>
          <label>نام پدر</label>
          <label>تلفن تماس</label>
          <label>شغل</label>
          <label>سمت در ستاد</label>
          <label>منطقه تحت پوشش</label>
          <button onClick={deleteHandler}>حذف</button>
        </div>
        <div className={styles.ButtonContainer}>
          <input
            type="text"
            name="fullName"
            value={selecetedMember.fullName}
            onChange={changeHandler}
            placeholder="نام و نام خانوادگی"
          />
          <input
            type="text"
            name="fatherName"
            value={selecetedMember.fatherName}
            onChange={changeHandler}
            placeholder="نام پدر"
          />
          <input
            type="text"
            name="phone"
            value={selecetedMember.phone}
            onChange={changeHandler}
            placeholder="تلفن تماس"
          />
          <input
            type="text"
            name="work"
            value={selecetedMember.work}
            onChange={changeHandler}
            placeholder="شغل"
          />
          <input
            type="text"
            name="semat"
            value={selecetedMember.semat}
            onChange={changeHandler}
            placeholder="سمت در ستاد"
          />
          <input
            type="text"
            name="mantagheh"
            value={selecetedMember.mantagheh}
            onChange={changeHandler}
            placeholder="منطقه تحت پوشش"
          />
          <button onClick={updateHandler}>ویرایش</button>
        </div>
      </div>
      <div className={styles.searchSection}>
        <div>
          <input
            type="text"
            name="nameSearch"
            placeholder="نام و نام خانوادگی"
            value={nameSearch}
            onChange={searchChangeHandler}
          />
          <button name="SearchByName" onClick={serachHandler}>
            جستجو
          </button>
        </div>
        <div>
          <input
            type="text"
            name="phoneSearch"
            placeholder="شماره تلفن"
            value={phoneSearch}
            onChange={searchChangeHandler}
          />
          <button name="SearchByPhone" onClick={serachHandler}>
            جستجو
          </button>
        </div>
        <button className={styles.AllMemberButton} onClick={allMemberHandler}>
          نمایش همه اعضا
        </button>
      </div>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th>نام و نام خانوادگی</th>
            <th>نام پدر</th>
            <th>تلفن تماس</th>
            <th>شغل</th>
            <th>سمت در ستاد</th>
            <th>منظقه تحت پوشش</th>
          </tr>
        </thead>
        <tbody>
          {searchMember.length > 0
            ? searchMember.map((item) => (
                <tr
                  key={item.id}
                  className={styles.TableTr}
                  onClick={() => SelectHandler(item)}>
                  <td className={styles.TableTd}>{item.fullName}</td>
                  <td className={styles.TableTd}>{item.fatherName}</td>
                  <td className={styles.TableTd}>{item.phone}</td>
                  <td className={styles.TableTd}>{item.work}</td>
                  <td className={styles.TableTd}>{item.semat}</td>
                  <td className={styles.TableTd}>{item.mantagheh}</td>
                </tr>
              ))
            : data.map((item) => (
                <tr
                  key={item.id}
                  className={styles.TableTr}
                  onClick={() => SelectHandler(item)}>
                  <td className={styles.TableTd}>{item.fullName}</td>
                  <td className={styles.TableTd}>{item.fatherName}</td>
                  <td className={styles.TableTd}>{item.phone}</td>
                  <td className={styles.TableTd}>{item.work}</td>
                  <td className={styles.TableTd}>{item.semat}</td>
                  <td className={styles.TableTd}>{item.mantagheh}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllMembers;
