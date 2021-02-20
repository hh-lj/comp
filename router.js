// 创建路由对象
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'computer'
});
var fs = require("fs");

// 挂载路由
// 登录页面
router.get('/', function (req, res) {
    res.render("login.html", {});
});
//注册页面
router.get('/register', function (req, res) {
    fs.readFile("./views/register.html", 'utf8', function (error, data) {
        if (error) {
            return console.log("文件读取失败");
        } else {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});

//用户注册接口
router.post('/register', (req, res) => {
    connection.query(`select * from user where userName ='${req.body.userName}'`, (error, result) => {
        if (error) {
            console.log(error);
            res.send({ msg: '注册失败！', status: false });
        } else {
                
            if (result.length !== 0) {    
               
                res.send('该用户已经注册了！');
                
            } else {
                connection.query(`INSERT INTO user(userName,passWord) values('${req.body.userName}','${req.body.passWord}')`,(error, result) => {
                        if (error) {
                            res.send({ msg: '注册失败！', status: false });
                        } else {
                            res.send({ msg: '注册成功！', status: true });
                        }
                    })
            }
        }
    })
});

//用户登录接口
router.post('/login', (req, res) => {
    connection.query(`select * from user where userName='${req.body.userName}'`, (error, result) => {
        if (error) {
            res.send({
                msg: '登录失败！',
                status: false
            });
        } else {
            if (result[0].passWord === req.body.passWord) {
                delete result[0].passWord;
                res.send({
                    msg: '登录成功！',
                    status: true,
                    userInfo: result[0]
                })
            } else {
                res.send({
                    msg: '密码或者账号错误！',
                    status: false
                })
            }

        }
    });
});

//用户搜索接口
router.post('/index/search', (req, res) => {
    connection.query(`select * from classroom where room_name='${req.body.room_name}'`, (error, data) => {
        if (error) {
            console.log(111)
            res.send({
                msg: '查询失败！',
                status: false
            });
        } else {
            console.log(data)
            res.send(data);
        }
    })
});

//上课接口
router.post('/index/come', (req, res) => {
    connection.query(`UPDATE classRoom SET 'condition=true' where id=${req.body.id}`, (error, data) => {
        if (error) {
            res.send({
                msg: '上课失败！',
                status: false
            });
        } else {
            res.send({
                msg: '上课成功！',
                status: true,
                condition: true
            });
        }
    })
});

//下课接口
router.post('/index/go', (req, res) => {
    connection.query(`UPDATE classRoom SET 'condition=false' where id=${req.body.id}`, (error, data) => {
        if (error) {
            res.send({
                msg: '下课失败！',
                status: false
            });
        } else {
            res.send({
                msg: '下课成功！',
                status: true,
                condition: false
            });
        }
    })
});

//获取机房列表接口
router.post('/index/list', (req,res) => {
    // select * from classroom order by room_name asc
    connection.query(`select * from classroom`, (error, result) => {
        if (error) {
            res.send({
                msg: '获取失败！',
                status: false
            });
        } else {        
            res.send(result);
        }
    })
});

//获取个人信息接口
router.post('/index/personDetail', (req, res) => {
    connection.query(`select * from users where id='${req.body.id}'`, (error, data) => {
        if (error) {
            res.send({
                msg: '获取失败！',
                status: false
            });
        } else {
            res.send(data[0]);
        }
    })
});
//添加个人信息接口
router.post('/index/changeInfo', (req, res) => {
    connection.query(`update user set department='${req.body.departmenet}',userTel='${req.body.userTel}',realName='${req.body.realName}' where id='${req.body.id}'`, (error, data) => {
        if (error) {
            res.send({
                msg: '修改失败！',
                status: false
            });
        } else {
            res.send({
                msg: '修改成功！',
                status: true
            });
        }
    })
});


//-----------------------------------用户页面路由---------------------------------------------
//首页
router.get('/index', function (req, res) {
    fs.readFile("./views/index.html", 'utf8', function (error, data) {
        if (error) {
            return console.log("文件读取失败");
        } else {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});
//查看机房
router.get('/index/look', function (req, res) {
    fs.readFile("./views/lookCR.html", 'utf8', function (error, data) {
        if (error) {
            return console.log("文件读取失败");
        } else {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});
//个人中心
router.get('/index/person', function (req, res) {
    fs.readFile("./views/person.html", 'utf8', function (error, data) {
        if (error) {
            return console.log("文件读取失败");
        } else {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});
//下课
router.get('/index/go', function (req, res) {
    fs.readFile("./views/blog.html", 'utf8', function (error, data) {
        if (error) {
            return console.log("文件读取失败");
        } else {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});


// ----------------------------管理员页面路由-----------------------------------------------
//管理员首页
router.get('/admin', function (req, res) {
    fs.readFile("./views/blog.html", 'utf8', function (error, data) {
        if (error) {
            return console.log("文件读取失败");
        } else {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});
//增加机房
router.get('/admin/add', function (req, res) {
    fs.readFile("./views/blog.html", 'utf8', function (error, data) {
        if (error) {
            return console.log("文件读取失败");
        } else {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});
//删除机房
router.get('/admin/delete', function (req, res) {
    fs.readFile("./views/blog.html", 'utf8', function (error, data) {
        if (error) {
            return console.log("文件读取失败");
        } else {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});
//删除用户
router.get('/admin/deleteUser', function (req, res) {
    fs.readFile("./views/blog.html", 'utf8', function (error, data) {
        if (error) {
            return console.log("文件读取失败");
        } else {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});
//修改机房
router.get('/admin/change', function (req, res) {
    fs.readFile("./views/blog.html", 'utf8', function (error, data) {
        if (error) {
            return console.log("文件读取失败");
        } else {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});
//搜索机房
router.get('/admin/search', function (req, res) {
    fs.readFile("./views/blog.html", 'utf8', function (error, data) {
        if (error) {
            return console.log("文件读取失败");
        } else {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});
//下课
router.get('/index/go', function (req, res) {
    fs.readFile("./views/blog.html", 'utf8', function (error, data) {
        if (error) {
            return console.log("文件读取失败");
        } else {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});
//下课
router.get('/index/go', function (req, res) {
    fs.readFile("./views/blog.html", 'utf8', function (error, data) {
        if (error) {
            return console.log("文件读取失败");
        } else {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});


//获取用户列表接口
router.post('/admin/getUsers', (req, res) => {
    connection.query(`select * from users'`, (error, data) => {
        if (error) {
            res.send({
                msg: '获取失败！',
                status: false
            });
        } else {
            res.send(data[0]);
        }
    })
});
//查看用户接口
router.post('/admin/lookUsers', (req, res) => {
    connection.query(`select * from users'`, (error, data) => {
        if (error) {
            res.send({
                msg: '获取失败！',
                status: false
            });
        } else {
            res.send(data[0]);
        }
    })
});
//删除用户接口
router.post('/admin/deleteUsers', (req, res) => {
    connection.query(`DELETE FROM users WHERE id='${req.body.user_id}'`, (error, data) => {
        if (error) {
            res.send({
                msg: '删除失败！',
                status: false
            });
        } else {
            res.send({
                msg: '删除成功！',
                status: true
            });
        }
    })
});


//添加机房接口
router.post('/admin/addClassRoom', (req, res) => {
    connection.query(`INSERT INTO classRooms values(${req.body.room_name},${req.body.computer_num},
    ${req.body.mouse_num},${req.body.keyboard_num},'${req.body.other}','false')`, (error, data) => {
        if (error) {
            res.send({
                msg: '添加失败！',
                status: false
            });
        } else {
            res.send({
                msg: '添加成功！',
                status: true
            });
        }
    })
});
//删除机房接口
router.post('/admin/deleteClassRoom', (req, res) => {
    connection.query(`DELETE classrooms where id=${req.body.id}`, (error, data) => {
        if (error) {
            res.send({
                msg: '删除失败！',
                status: false
            });
        } else {
            res.send({
                msg: '删除成功！',
                status: true
            });
        }
    })
});
//修改机房接口
router.post('/admin/changeClassRoom', (req, res) => {
    connection.query(`UPDATE FROM classrooms set room_name=${req.body.room_name},
    computer_num=${req.body.computer_num},mouse_num=${req.body.mouse_num},
    keyboard_num=${req.body.keyboard_num},other='${req.body.other}'`, (error, data) => {
        if (error) {
            res.send({
                msg: '修改失败！',
                status: false
            });
        } else {
            res.send(data[0]);
        }
    })
});
//查看机房接口
router.post('/admin/lookClassRoom', (req, res) => {
    connection.query(`select * from users where id='${req.body.id}'`, (error, data) => {
        if (error) {
            res.send({
                msg: '获取失败！',
                status: false
            });
        } else {
            res.send(data[0]);
        }
    })
});
// 处理404情况
router.get('*', function (req, res) {
    fs.readFile("./views/error.html", 'utf8', function (error, data) {
        if (error) {
            return
        } else {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
});

module.exports = router;