using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using System.IO.Ports;

namespace ChinaReader
{
    public partial class FrmMain : Form
    {
        public FrmMain()
        {
            InitializeComponent();
        }
        Reader_S70 readerObj = new Reader_S70();
        ushort baud = 19200;
        /// <summary>
        /// 显示提示消息
        /// </summary>
        void ShowMessage(string msgStr, params object[] objs)
        {
            string msg = string.Format(msgStr, objs);
            labelState.Text = msg;
        }
        /// <summary>
        /// 获得读写的类型(0-31,32-38,所有)
        /// </summary>
        ReadWriteTypeModeEnum GetReadWriteType()
        {
            ReadWriteTypeModeEnum rwType;
            if (rdoReadBlockType_0.Checked)
            {
                rwType = ReadWriteTypeModeEnum.Read0To31;
            }
            else if (rdoReadBlockType_1.Checked)
            {
                rwType = ReadWriteTypeModeEnum.Read32TO38;
            }
            else
            {
                rwType = ReadWriteTypeModeEnum.ReadAll;
            }
            return rwType;
        }
        /// <summary>
        /// 获得密钥类型,A密钥,B密钥
        /// </summary>
        KeyModeEnum GetKeyModel()
        {
            KeyModeEnum km;
            if (rdoBtnKeyA.Checked)
            {
                km = KeyModeEnum.KeyA;
            }
            else
            {
                km = KeyModeEnum.KeyB;
            }
            return km;
        }
        //打开串口
        private void btnOpenCom_Click(object sender, EventArgs e)
        {
            if (btnOpenCom.Text == "Open Port")
            {
                ushort comNo = Convert.ToUInt16(coBoxComNo.Text.Substring(3));
                if (readerObj.OpenCom(comNo, baud))
                {
                    ShowMessage("Open Port Success!");
                    btnOpenCom.Text = "Close Port";
                }
                else
                {
                    ShowMessage("Open Port Fail!");
                }
            }
            else
            {
                if (readerObj.CloseCom())
                {
                    ShowMessage("Close Port Success!");
                    btnOpenCom.Text = "Open Port";
                }
            }
        }
        //窗体加载
        private void FrmMain_Load(object sender, EventArgs e)
        {
            string[] comNos = SerialPort.GetPortNames();
            coBoxComNo.Items.Clear();
            for (int i = 0; i < comNos.Length; i++)
            {
                coBoxComNo.Items.Add(comNos[i]);
            }
            for (int i = 0; i < 32; i++)
            {
                coBoxKeyGroupIndex.Items.Add(i);
            }
            for (int i = 0; i < 32 * 4; i++)
            {
                coBoxBlockNo.Items.Add(i);
            }
            coBoxKeyGroupIndex.SelectedIndex = 0;
            coBoxBlockNo.SelectedIndex = 0;
            coBoxComNo.SelectedIndex = 0;
        }
        //是否使用读卡器中密码组来读取或写入数据
        private void chkBoxUseKeyGroup_CheckedChanged(object sender, EventArgs e)
        {
            if (chkBoxUseKeyGroup.Checked)
            {
                coBoxKeyGroupIndex.Enabled = true;
                txtKey.ReadOnly = true;
            }
            else
            {
                coBoxKeyGroupIndex.Enabled = false;
                txtKey.ReadOnly = false;
            }
        }
        //下载密钥组到读卡器
        private void btnDownloadKey_Click(object sender, EventArgs e)
        {
            byte blockNo = Convert.ToByte(txtKeyGroupIndex.Text);
            string keyStr = txtKeyGroupStr.Text;
            if (readerObj.DownloadKeyToReader(blockNo, keyStr))
            {
                ShowMessage("Set {0} Key Success!",blockNo);
            }
            else
            {
                ShowMessage("Set {0} Key Fail!", blockNo);
            }
        }
        //读数据
        private void btnReadData_Click(object sender, EventArgs e)
        {
            ReadWriteTypeModeEnum rwType = GetReadWriteType();
            KeyModeEnum km = GetKeyModel();
            byte blockNo = Convert.ToByte(coBoxBlockNo.Text);
            byte[] blockData = null;
            string blockDatastr = null;
            string cardSerialNo = string.Empty;
            byte[] cxh; //卡序号
            bool readOK = false;

            if (chkBoxUseKeyGroup.Checked)
            {
                //使用密钥组来读卡
                byte keyGroupIndex = Convert.ToByte(coBoxKeyGroupIndex.Text);

                blockData = readerObj.ReadData(rwType, km, blockNo, keyGroupIndex, out cxh);
                if (blockData != null)
                {
                    readOK = true;
                    ShowMessage("Read {0} ,Success!", blockNo);
                    blockDatastr = readerObj.GetStringByData(blockData);
                    cardSerialNo = readerObj.GetStringByData(cxh);
                }
            }
            else
            {
                //使用密钥来读卡
                string keyStr = txtKey.Text;
                
                blockData = readerObj.ReadData(km, blockNo, keyStr, out cxh);
                if (blockData != null)
                {
                    blockDatastr = readerObj.GetStringByData(blockData);
                    cardSerialNo = readerObj.GetStringByData(cxh);
                    readOK = true;
                }
            }
            if (readOK)
            {
                txtBlockData.Text = blockDatastr;
                txtCardSerialNo.Text = cardSerialNo;
                ShowMessage("Read {0} ,Success!", blockNo);
            }
            else
            {
                txtBlockData.Text = string.Empty;
                txtCardSerialNo.Text = string.Empty;
                ShowMessage("Read {0} ,Fail!", blockNo);
            }
        }
        //写数据
        private void btnWriteData_Click(object sender, EventArgs e)
        {
            ReadWriteTypeModeEnum rwType = GetReadWriteType();
            KeyModeEnum km = GetKeyModel();
            byte blockNo = Convert.ToByte(coBoxBlockNo.Text);
            bool writeOK = false;
            if (chkBoxUseKeyGroup.Checked)
            {
                byte keyGroupIndex = Convert.ToByte(coBoxKeyGroupIndex.Text);
                string dataStr = txtBlockData.Text.Trim();
                writeOK = readerObj.WriteData(rwType, km, blockNo, keyGroupIndex, dataStr);
            }
            else
            {
                string keyStr = txtKey.Text;
                string pDataStr = txtBlockData.Text;
                writeOK = readerObj.WriteData(km, blockNo, keyStr, pDataStr);
            }
            if (writeOK)
            {
                ShowMessage("Write {0} Success!", blockNo);
            }
            else
            {
                ShowMessage("Write {0} Fail!", blockNo);
            }
        }
        //读卡序号
        private void btnReadCardSerialNo_Click(object sender, EventArgs e)
        {
            byte[] cardSerial = readerObj.SelectCard();
            string csh = readerObj.GetStringByData(cardSerial);
            if (csh == null)
            {
                ShowMessage("Request Fal");
            }
            else
            {
                ShowMessage("Request Success");
                txtCardSerialNo.Text = csh;
            }
        }

        private void btnGreenLED_Click(object sender, EventArgs e)
        {
            if (readerObj.OpenLed(LightColor.GreenLED))
            {
                ShowMessage("Open GreenLED Success");
            }
            else
            {
                ShowMessage("Open GreenLED Fail");
            }
        }

        private void btnRedLED_Click(object sender, EventArgs e)
        {
            if (readerObj.OpenLed(LightColor.RedLED))
            {
                ShowMessage("Open RedLED Success");
            }
            else
            {
                ShowMessage("Open RedLED Fail");
            }
        }

        private void btnYellowLED_Click(object sender, EventArgs e)
        {
            if (readerObj.OpenLed(LightColor.AllLED))
            {
                ShowMessage("Open YellowLED Success");
            }
            else
            {
                ShowMessage("Open YellowLED Fail");
            }
        }

        private void btnLedOff_Click(object sender, EventArgs e)
        {
            if (readerObj.OpenLed(LightColor.CloseLED))
            {
                ShowMessage("Close All LED Success");
            }
            else
            {
                ShowMessage("Close All LED Fail");
            }
        }

        private void btnBeep_Click(object sender, EventArgs e)
        {
            if (readerObj.Beep(10))
            {
                ShowMessage("Beep ");
            }
            else
            {
                ShowMessage("Beep Fail");
            }
        }
    }
}
