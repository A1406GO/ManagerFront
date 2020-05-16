import XLSX from "xlsx"

export function downloadEngineer(engineers) {
    var sheet = {};
    sheet['A1'] = { t: 's', v: '编号' };
    sheet['B1'] = { t: 's', v: '姓名' };
    sheet['C1'] = { t: 's', v: '性别' };
    sheet['D1'] = { t: 's', v: '生日' };
    sheet['E1'] = { t: 's', v: '学历' };
    sheet['F1'] = { t: 's', v: '籍贯' };
    sheet['G1'] = { t: 's', v: '地址' };
    sheet['H1'] = { t: 's', v: '电话' };
    sheet['I1'] = { t: 's', v: '工龄' };
    sheet['J1'] = { t: 's', v: '基本工资' };
    for (var i = 0; i < engineers.length; i++) {
        sheet['A' + (i + 2)] = { t: 'n', v: engineers[i].id };
        sheet['B' + (i + 2)] = { t: 's', v: engineers[i].name };
        sheet['C' + (i + 2)] = { t: 's', v: engineers[i].sex };
        sheet['D' + (i + 2)] = { t: 'd', v: engineers[i].birthday };
        sheet['E' + (i + 2)] = { t: 's', v: engineers[i].education };
        sheet['F' + (i + 2)] = { t: 's', v: engineers[i].hometown };
        sheet['G' + (i + 2)] = { t: 's', v: engineers[i].address };
        sheet['H' + (i + 2)] = { t: 's', v: engineers[i].phoneNumber };
        sheet['I' + (i + 2)] = { t: 'n', v: engineers[i].seniority };
        sheet['J' + (i + 2)] = { t: 'n', v: engineers[i].wage };
    }
    sheet['!ref'] = 'A1:J' + (engineers.length + 1);
    var workbook = {
        SheetNames: ['sheet1'],
        Sheets: { 'sheet1': sheet }
    };

    var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    var wbout = XLSX.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    // 字符串转ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    openDownloadDialog(blob, '工程师信息表.xlsx');
}

export function openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url);
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || '';
    var event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}


