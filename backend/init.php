<?php
// Database Initialization Script
// قم بزيارة: http://localhost/gaming-store/backend/init.php لإنشاء قاعدة البيانات

header("Content-Type: text/html; charset=UTF-8");

// الإعدادات
$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'gaming_store';

// الاتصال بدون تحديد قاعدة البيانات
$conn = new mysqli($host, $user, $pass);

if ($conn->connect_error) {
    die("😞 خطأ في الاتصال: " . $conn->connect_error);
}

try {
    // إنشاء قاعدة البيانات
    $sql = "CREATE DATABASE IF NOT EXISTS `$dbname`;";
    if (!$conn->query($sql)) {
        throw new Exception("خطأ في إنشاء قاعدة البيانات: " . $conn->error);
    }

    // استخدام قاعدة البيانات
    $conn->select_db($dbname);

    // إنشاء جدول الحسابات
    $sql = "CREATE TABLE IF NOT EXISTS accounts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        game VARCHAR(100) NOT NULL,
        level VARCHAR(100),
        rank VARCHAR(100),
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(255),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    
    if (!$conn->query($sql)) {
        throw new Exception("خطأ في إنشاء جدول الحسابات: " . $conn->error);
    }

    // إنشاء جدول الطلبات
    $sql = "CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        game VARCHAR(100),
        price DECIMAL(10, 2),
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    
    if (!$conn->query($sql)) {
        throw new Exception("خطأ في إنشاء جدول الطلبات: " . $conn->error);
    }

    // إدراج بيانات تجريبية
    $sql = "SELECT COUNT(*) as count FROM accounts;";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();

    if ($row['count'] == 0) {
        $sql = "INSERT INTO accounts (game, level, rank, price, image, description) VALUES 
            ('Valorant', 'Radiant', '5000 RR', 99, 'valorant.jpg', 'حساب Valorant محترف'),
            ('Fortnite', '500', 'Legendary', 79, 'fortnite.jpg', 'حساب Fortnite قوي'),
            ('League of Legends', '30', 'Challenger', 89, 'lol.jpg', 'حساب LOL احترافي'),
            ('CSGO', '1000 ELO', 'Global Elite', 69, 'csgo.jpg', 'حساب CSGO متقدم'),
            ('Apex Legends', '500', 'Predator', 75, 'apex.jpg', 'حساب Apex قوي'),
            ('Dota 2', 'Divine 5', '10K MMR', 85, 'dota2.jpg', 'حساب Dota 2 عالي');";
        
        if (!$conn->query($sql)) {
            throw new Exception("خطأ في إدراج البيانات التجريبية: " . $conn->error);
        }
    }

    echo "✅ <h1 style='color: #22c55e;'>تم إعداد قاعدة البيانات بنجاح!</h1>";
    echo "<p style='font-size: 1.1rem; padding: 1rem;'>✓ تم إنشاء قاعدة البيانات 'gaming_store'</p>";
    echo "<p style='font-size: 1.1rem; padding: 1rem;'>✓ تم إنشاء جدول الحسابات</p>";
    echo "<p style='font-size: 1.1rem; padding: 1rem;'>✓ تم إنشاء جدول الطلبات</p>";
    echo "<p style='font-size: 1.1rem; padding: 1rem;'>✓ تم إدراج بيانات تجريبية</p>";
    echo "<hr>";
    echo "<p><a href='../frontend/index.html' style='color: #8b5cf6; font-weight: bold; font-size: 1.2rem;'>👈 العودة للموقع الرئيسي</a></p>";
    
} catch (Exception $e) {
    echo "❌ <h1 style='color: #ef4444;'>حدث خطأ أثناء الإعداد</h1>";
    echo "<p style='font-size: 1.1rem; padding: 1rem; color: #ef4444;'>" . $e->getMessage() . "</p>";
}

$conn->close();
?>
