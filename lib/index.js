"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.Config = exports.name = exports.using = exports.inject = void 0;
const koishi_1 = require("koishi");
const url_1 = require("url");
const path_1 = require("path");
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const promises_1 = require("fs/promises");
exports.inject = { required: ['canvas'] };
exports.using = ['canvas'];
exports.name = 'ba-stu-presona';
exports.Config = koishi_1.Schema.object({});
async function apply(ctx) {
    const root = path.join(ctx.baseDir, 'data', 'ba-presona');
    await fs.mkdir(root, { recursive: true });
    const random = new koishi_1.Random(() => Math.random());
    async function checkFileExists(file) {
        try {
            await (0, promises_1.access)(file, promises_1.constants.F_OK);
            return true; // 文件存在
        }
        catch {
            return false; // 文件不存在或其他错误
        }
    }
    ctx.model.extend('presona', {
        id: 'string',
        imgid: 'string',
        age: 'unsigned',
        color: 'string',
        cup: 'string',
        tactics_type: 'string',
        weaponry: 'string',
        target_precautionary_type: 'string',
        target_precautionary_type_2nd: 'string',
        school: 'string',
        yewai: 'string',
        jiedao: 'string',
        shinei: 'string',
        one: 'string',
        two: 'string',
        three: 'string',
    });
    function type_colors(type) {
        let type_color;
        switch (type) {
            case '轻型装甲':
            case '爆炸':
                type_color = '#930002';
                break;
            case '重型装甲':
            case '贯通':
                type_color = '#BF8A00';
                break;
            case '特殊装甲':
            case '神秘':
                type_color = '#1C709C';
                break;
            case '弹性装甲':
            case '振动':
                type_color = '#9446A2';
                break;
        }
        return type_color;
    }
    function school_img_name(name) {
        let ename;
        switch (name) {
            case '阿拜多斯':
                ename = 'aby';
                break;
            case '三一':
                ename = 'tri';
                break;
            case '千年':
                ename = 'ml';
                break;
            case '格黑娜':
                ename = 'geh';
                break;
            case '瓦尔基里':
                ename = 'val';
                break;
            case '山海经':
                ename = 'sh';
                break;
            case '赤冬':
                ename = 'red';
                break;
            case '百鬼夜行':
                ename = 'hy';
                break;
            case '阿里乌斯':
                ename = 'ari';
                break;
            case 'SRT':
                ename = 'srt';
                break;
            case '常台盘':
                ename = 'ctp';
                break;
            case '克罗诺斯':
                ename = 'kro';
                break;
        }
        return ename;
    }
    async function create_img(switchs, cas, terr, outf, id) {
        let imgid = id.slice(0, 8);
        const size = 832;
        const canvas = await ctx.canvas.createCanvas(size, 1048);
        const ctx_a = canvas.getContext('2d');
        const back = await ctx.canvas.loadImage((0, path_1.resolve)(__dirname, 'assets/backdrop' + switchs + '.jpg'));
        const schoolimg = await ctx.canvas.loadImage((0, path_1.resolve)(__dirname, 'assets/' + school_img_name(cas.school) + '.png'));
        const yewai = await ctx.canvas.loadImage((0, path_1.resolve)(__dirname, 'assets/' + terr.yewai + '.png'));
        const jiedao = await ctx.canvas.loadImage((0, path_1.resolve)(__dirname, 'assets/' + terr.jiedao + '.png'));
        const shinei = await ctx.canvas.loadImage((0, path_1.resolve)(__dirname, 'assets/' + terr.shinei + '.png'));
        const one = await ctx.canvas.loadImage((0, path_1.resolve)(__dirname, 'assets/' + outf.one + '.png'));
        const two = await ctx.canvas.loadImage((0, path_1.resolve)(__dirname, 'assets/' + outf.two + '.png'));
        const three = await ctx.canvas.loadImage((0, path_1.resolve)(__dirname, 'assets/' + outf.three + '.png'));
        const fixedHeight = 140;
        const ratio = schoolimg.width / schoolimg.height;
        const newWidth = fixedHeight * ratio;
        ctx_a.drawImage(back, 0, 0, size, 1048);
        ctx_a.font = 'bold 70px YouYuan';
        ctx_a.fillStyle = 'black';
        ctx_a.fillText(String(cas.age), 250, 110);
        ctx_a.fillText(cas.color, 600, 110);
        switch (switchs) {
            case 1:
                ctx_a.drawImage(schoolimg, (418 - (newWidth / 2)), 170, newWidth, fixedHeight);
                break;
            case 2:
                ctx_a.drawImage(schoolimg, (320 - (newWidth / 2)), 189, newWidth / 1.3, fixedHeight / 1.3);
                ctx_a.fillText(cas.cup, 600, 260);
                break;
        }
        ctx_a.fillStyle = (type_colors(cas.target_precautionary_type));
        ctx_a.fillText(cas.target_precautionary_type, 180, 420);
        ctx_a.font = 'bold 60px YouYuan';
        ctx_a.fillStyle = (type_colors(cas.target_precautionary_type_2nd));
        ctx_a.fillText(cas.target_precautionary_type_2nd, 560, 420);
        ctx_a.fillStyle = 'black';
        ctx_a.font = 'bold 55px YouYuan';
        ctx_a.fillText(cas.tactics_type, 150, 580);
        ctx_a.font = 'bold 70px YouYuan';
        ctx_a.fillText(cas.weaponry, 600, 580);
        ctx_a.drawImage(yewai, 90, 715, 90, 90);
        ctx_a.drawImage(jiedao, 375, 715, 90, 90);
        ctx_a.drawImage(shinei, 650, 715, 90, 90);
        ctx_a.drawImage(one, 50, 860, 180, 140);
        ctx_a.drawImage(two, 330, 860, 180, 140);
        ctx_a.drawImage(three, 610, 860, 180, 140);
        const buffer_back = await canvas.toBuffer('image/png');
        await fs.writeFile(root + '/perimg_' + imgid + '.jpg', buffer_back);
    }
    function outfit() {
        //此函数未做纯文字输出的适配
        let outfit1 = [
            '19', '18', '17'
        ];
        let outfit2 = [
            '15', '16', '14'
        ];
        let outfit3 = [
            '12', '13', '11'
        ];
        let outf = [];
        outf.push(random.pick(outfit1));
        outf.push(random.pick(outfit2));
        outf.push(random.pick(outfit3));
        return outf;
    }
    function color() {
        let colors = [
            "红色", "黑色",
            "紫色", "蓝色",
            "绿色", "金色",
            "灰色", "青色",
            "粉色", "白色"
        ];
        return random.pick(colors);
    }
    function age(type) {
        var ss = random.bool(0.95);
        let ag;
        if (type > 1) {
            ag = random.int(9, 21);
        }
        else {
            if (ss) {
                ag = random.pick([15, 16, 17]);
            }
            else {
                ag = random.pick([11, 18]);
            }
        }
        return ag;
    }
    function cup() {
        var cups = [
            'AA', 'A', 'B', 'C', 'D', 'E',
        ];
        var cupspro = ['AA', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',];
        //cup数据参考了维基百科
        let cupout;
        var ss = random.bool(0.8);
        if (ss) {
            cupout = random.pick(cups);
        }
        else {
            cupout = random.pick(cupspro);
        }
        return cupout;
    }
    function tactics_type() {
        let tactics = ['坦克', '输出', '治疗', '辅助', '战术支援'];
        return random.pick(tactics);
    }
    function terrain() {
        let bool = true;
        let ter = [];
        while (bool) {
            ter = [];
            let sum = 0;
            let L;
            for (let i = 0; i < 3; i++) {
                L = random.int(1, 6);
                ter.push(L);
                sum += L;
            }
            if (sum == 10 && random.bool(0.05)) {
                console.log(666);
                bool = false;
                break;
            }
            else if (sum == 9) {
                bool = false;
                break;
            }
        }
        let terra = ['占位', 'D', 'C', 'B', 'A', 'S'];
        return [terra[ter[0]], terra[ter[1]], terra[ter[2]]];
    }
    function weaponry() {
        let arms = ['SG', 'SMG', 'AR', 'GL', 'HG', 'SR', 'MG'];
        let armspro = ['RL', 'RG', 'MT', 'FT'];
        let ss = random.bool(0.95);
        let weap;
        if (ss) {
            weap = random.pick(arms);
        }
        else {
            weap = random.pick(armspro);
        }
        return weap;
    }
    function target_precautionary_type(target) {
        let type;
        let tpyep = ['轻型装甲', '重型装甲', '特殊装甲'];
        let typet = ['爆炸', '贯通', '神秘'];
        var ss = random.bool(0.9);
        if (target) {
            if (ss) {
                type = random.pick(typet);
            }
            else {
                type = '振动';
            }
        }
        else {
            if (ss) {
                type = random.pick(tpyep);
            }
            else {
                type = '弹性装甲';
            }
        }
        return type;
    }
    function school(type) {
        var schs;
        var sch = [
            '三一',
            '千年',
            '格黑娜',
            '瓦尔基里',
            '山海经',
            '赤冬',
            '百鬼夜行',
        ];
        var schpro = [
            '克罗诺斯',
            'SRT',
            '阿里乌斯',
            '阿拜多斯',
            '常盘台',
        ];
        var ss = random.bool(0.9);
        if (type > 1) {
            let schall = sch.concat(schpro);
            schs = random.pick(schall);
        }
        else {
            if (ss) {
                schs = random.pick(sch);
            }
            else {
                schs = random.pick(['克罗诺斯', 'SRT', '阿里乌斯']);
            }
        }
        return schs;
    }
    ctx.command('bapresona 看看你在基沃托斯的形象')
        .option('original-setting', '-a 不遵循剧情设定')
        .option('body', '-b 包含O派信息')
        .option('reprovision', '-r 重开')
        .alias('转生')
        .action(async ({ options, session }) => {
        console.log(session.event.user.id);
        const uid = session.event.user.id;
        var type;
        //0--遵循&不包含   🟢🟢
        //1--遵循&包含     🟢🔴
        //2--不遵循&不包含 🔴🟢
        //3--不遵循&包含   🔴🔴
        if (Object.keys(options).length == 0) {
            type = 0;
        }
        else if (options.body && !options['original-setting']) {
            type = 1;
        }
        else if (options['original-setting'] && !options.body) {
            type = 2;
        }
        else if (options.body && options['original-setting']) {
            type = 3;
        }
        var cup_type;
        if (type == 1 || type == 3) {
            cup_type = 2;
        }
        else {
            cup_type = 1;
        }
        if (options.reprovision) {
            let cass = {
                age: age(type),
                color: color(),
                cup: cup(),
                target_precautionary_type: target_precautionary_type(true),
                target_precautionary_type_2nd: target_precautionary_type(false),
                tactics_type: tactics_type(),
                weaponry: weaponry(),
                school: school(type)
            };
            let terrs = terrain();
            let terr = {
                yewai: (terrs[0]),
                jiedao: (terrs[1]),
                shinei: (terrs[2])
            };
            let outfits = outfit();
            let outfitss = {
                one: outfits[0],
                two: outfits[1],
                three: outfits[2]
            };
            try {
                await ctx.database.upsert('presona', [
                    {
                        id: uid,
                        imgid: uid.slice(0, 8),
                        age: cass.age,
                        color: cass.color,
                        cup: cass.cup,
                        tactics_type: cass.tactics_type,
                        weaponry: cass.weaponry,
                        target_precautionary_type: cass.target_precautionary_type,
                        target_precautionary_type_2nd: cass.target_precautionary_type_2nd,
                        school: cass.school,
                        yewai: terr.yewai,
                        jiedao: terr.jiedao,
                        shinei: terr.shinei,
                        one: outfits[0],
                        two: outfits[1],
                        three: outfits[2]
                    }
                ]);
            }
            catch (err) {
                console.log(err);
                session.send('呜呜呜，数据库写入出错了＞﹏＜');
            }
            await create_img(cup_type, cass, terr, outfitss, uid);
            return ('重生成功！你在基沃托斯的形象是：' +
                koishi_1.h.image((0, url_1.pathToFileURL)((0, path_1.resolve)(__dirname, '../../../data/ba-presona/perimg_'
                    + uid.slice(0, 8) + '.jpg')).href));
        }
        let cass = {
            age: age(type),
            color: color(),
            cup: cup(),
            target_precautionary_type: target_precautionary_type(true),
            target_precautionary_type_2nd: target_precautionary_type(false),
            tactics_type: tactics_type(),
            weaponry: weaponry(),
            school: school(type)
        };
        let terrs = terrain();
        let terr = {
            yewai: (terrs[0]),
            jiedao: (terrs[1]),
            shinei: (terrs[2])
        };
        let outfits = outfit();
        let outfitss = {
            one: outfits[0],
            two: outfits[1],
            three: outfits[2]
        };
        console.log(await ctx.database.get('presona', uid));
        const userdata = await ctx.database.get('presona', uid);
        if (userdata.length == 0) {
            try {
                await ctx.database.upsert('presona', [
                    {
                        id: uid,
                        imgid: uid.slice(0, 8),
                        age: cass.age,
                        color: cass.color,
                        cup: cass.cup,
                        tactics_type: cass.tactics_type,
                        weaponry: cass.weaponry,
                        target_precautionary_type: cass.target_precautionary_type,
                        target_precautionary_type_2nd: cass.target_precautionary_type_2nd,
                        school: cass.school,
                        yewai: terr.yewai,
                        jiedao: terr.jiedao,
                        shinei: terr.shinei,
                        one: outfits[0],
                        two: outfits[1],
                        three: outfits[2]
                    }
                ]);
            }
            catch (err) {
                console.log(err);
                session.send('呜呜呜，数据库写入出错了＞﹏＜');
            }
            await create_img(cup_type, cass, terr, outfitss, uid);
            await session.send('转生成功！你在基沃托斯的形象是：' +
                koishi_1.h.image((0, url_1.pathToFileURL)((0, path_1.resolve)(__dirname, '../../../data/ba-presona/perimg_'
                    + uid.slice(0, 8) + '.jpg')).href));
        }
        else {
            let statu;
            const filePath = root + '/perimg_' + uid.slice(0, 8) + '.jpg';
            await checkFileExists(filePath).then((exists) => {
                statu = exists;
                console.log(statu ? '文件存在' : '文件不存在'); // 这里 statu 将会有定义的值
            }).catch((error) => {
                console.error('检查文件存在时发生错误', error);
            });
            if (statu) {
                await session.send('你已经在基沃托斯有角色啦' +
                    koishi_1.h.image((0, url_1.pathToFileURL)((0, path_1.resolve)(__dirname, '../../../data/ba-presona/perimg_'
                        + uid.slice(0, 8) + '.jpg')).href));
            }
            else {
                console.log('正在重新生成图片');
                let cassr = {
                    age: userdata[0].age,
                    color: userdata[0].color,
                    cup: userdata[0].cup,
                    target_precautionary_type: userdata[0].target_precautionary_type,
                    target_precautionary_type_2nd: userdata[0].target_precautionary_type_2nd,
                    tactics_type: userdata[0].tactics_type,
                    weaponry: userdata[0].weaponry,
                    school: userdata[0].school
                };
                let terrsr = {
                    yewai: userdata[0].yewai,
                    jiedao: userdata[0].jiedao,
                    shinei: userdata[0].shinei
                };
                let outfitr = {
                    one: userdata[0].one,
                    two: userdata[0].two,
                    three: userdata[0].three
                };
                await create_img(cup_type, cassr, terrsr, outfitr, uid);
                await session.send('你已经在基沃托斯有角色啦' +
                    koishi_1.h.image((0, url_1.pathToFileURL)((0, path_1.resolve)(__dirname, '../../../data/ba-presona/perimg_'
                        + uid.slice(0, 8) + '.jpg')).href));
            }
        }
        //未测试bug
    });
}
exports.apply = apply;
