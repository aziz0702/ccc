let users = [];
let admins = [
    { name: 'مشرف أ', accountNumber: 'Ss100', password: 's90901', guild: 'A' }, // مشرف أ
    { name: 'مسؤول ب', accountNumber: 'Ll100', password: 'l90902', guild: 'B' }, // مسؤول ب
    { name: 'مشرف ت', accountNumber: 'Tt100', password: 't90903', guild: 'T' }, // مشرف ت
    { name: 'مسؤول ث', accountNumber: 'Bb100', password: 'b90904', guild: 'Th' }  // مسؤول ث
];

// دالة لتوليد رقم الحساب البنكي بناءً على النقابة
function generateAccountNumber(guild) {
    let prefix;
    switch (guild) {
        case 'A':
            prefix = '10';
            break;
        case 'B':
            prefix = '11';
            break;
        case 'T':
            prefix = '12';
            break;
        case 'Th':
            prefix = '13';
            break;
        default:
            prefix = '00';
            break;
    }

    let randomDigits = Math.floor(Math.random() * 900) + 100;
    return prefix + randomDigits;
}

// دالة لتبديل بين نموذج التسجيل ونموذج تسجيل الدخول
document.getElementById('switchToLogin').addEventListener('click', function () {
    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registrationMessage').style.display = 'none';
});

// دالة لتسجيل الحساب الجديد
document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let guild = document.getElementById('guild').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("كلمات المرور غير متطابقة.");
        return;
    }

    let accountNumber = generateAccountNumber(guild);
    let user = { name, guild, accountNumber, password, balance: 1000 };
    users.push(user);

    alert("تم تسجيل الحساب بنجاح. رقم حسابك هو: " + accountNumber);

    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registrationMessage').style.display = 'none';
});

// دالة لتسجيل الدخول
document.getElementById('loginButton').addEventListener('click', function () {
    let loginName = document.getElementById('loginName').value;
    let loginPassword = document.getElementById('loginPassword').value;

    // التحقق من بيانات العميل أولاً
    let user = users.find(user => user.name === loginName && user.password === loginPassword);
    // التحقق من بيانات المشرف بعد ذلك
    let admin = admins.find(admin => admin.name === loginName && admin.password === loginPassword);

    if (user) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('welcomeMessage').style.display = 'block';
        document.getElementById('userName').textContent = user.name;
        document.getElementById('accountBalance').textContent = user.balance;
        document.getElementById('logoutButton').style.display = 'block';
    } else if (admin) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        document.getElementById('adminLogoutButton').style.display = 'block';
    } else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة.");
    }
});

// دالة لتسجيل الخروج للعميل
document.getElementById('logoutButton').addEventListener('click', function () {
    document.getElementById('welcomeMessage').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('logoutButton').style.display = 'none';
    document.getElementById('userName').textContent = '';
    document.getElementById('accountBalance').textContent = '';
});

// دالة لتسجيل الخروج للمشرف
document.getElementById('adminLogoutButton').addEventListener('click', function () {
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('adminLogoutButton').style.display = 'none';
});

// دالة لتعديل رصيد العميل بواسطة المشرف باستخدام اسم العميل
document.getElementById('updateBalanceButton').addEventListener('click', function () {
    let clientName = document.getElementById('clientName').value; // اسم العميل
    let newBalance = document.getElementById('adminBalance').value; // الرصيد الجديد

    // الحصول على المشرف الذي سجّل دخوله
    let admin = admins.find(admin => admin.password === document.getElementById('loginPassword').value);

    if (admin) {
        // الحصول على العميل بناءً على الاسم
        let user = users.find(user => user.name === clientName);

        if (user) {
            // التحقق من أن المشرف ينتمي إلى نفس النقابة
            if (user.guild === admin.guild) {
                user.balance = parseFloat(newBalance); // تعديل الرصيد
                alert("تم تعديل الرصيد بنجاح. الرصيد الجديد هو: " + newBalance);
            } else {
                alert("المشرف لا يمكنه تعديل حسابات النقابات الأخرى.");
            }
        } else {
            alert("اسم العميل غير موجود.");
        }
    } else {
        alert("مشرف غير موجود.");
    }
});
