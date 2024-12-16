import axios from 'axios';

//ts-worksheet

const result = 3 + 5;
console.log(result); // 8

const doituong = {
    ten: "Tri",
    tuoi: 201
};
console.log(doituong); // { ten: "Tri", tuoi: 20 }

const date = new Date().toString();
console.log(date);

const loadUsers = async () => {
    try {
        const response = await axios.get("http://localhost:8080/user"); // Chờ kết quả
        console.log(response.data);
        response.data/*? $.length*/
    } catch (error) {
        console.error("Lỗi khi tải người dùng:", error); // Xử lý lỗi
    }
};
loadUsers(); /*?.*/


