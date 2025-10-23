namespace ChinaReader
{
    partial class FrmMain
    {
        /// <summary>
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows 窗体设计器生成的代码

        /// <summary>
        /// 设计器支持所需的方法 - 不要
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.coBoxComNo = new System.Windows.Forms.ComboBox();
            this.txtCardSerialNo = new System.Windows.Forms.TextBox();
            this.txtKey = new System.Windows.Forms.TextBox();
            this.coBoxBlockNo = new System.Windows.Forms.ComboBox();
            this.btnOpenCom = new System.Windows.Forms.Button();
            this.btnReadCardSerialNo = new System.Windows.Forms.Button();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.rdoBtnKeyB = new System.Windows.Forms.RadioButton();
            this.rdoBtnKeyA = new System.Windows.Forms.RadioButton();
            this.label5 = new System.Windows.Forms.Label();
            this.txtBlockData = new System.Windows.Forms.TextBox();
            this.chkBoxUseKeyGroup = new System.Windows.Forms.CheckBox();
            this.coBoxKeyGroupIndex = new System.Windows.Forms.ComboBox();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.btnDownloadKey = new System.Windows.Forms.Button();
            this.txtKeyGroupStr = new System.Windows.Forms.TextBox();
            this.label7 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.txtKeyGroupIndex = new System.Windows.Forms.TextBox();
            this.btnReadData = new System.Windows.Forms.Button();
            this.btnWriteData = new System.Windows.Forms.Button();
            this.labelState = new System.Windows.Forms.Label();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.rdoReadBlockType_2 = new System.Windows.Forms.RadioButton();
            this.rdoReadBlockType_1 = new System.Windows.Forms.RadioButton();
            this.rdoReadBlockType_0 = new System.Windows.Forms.RadioButton();
            this.btnGreenLED = new System.Windows.Forms.Button();
            this.btnRedLED = new System.Windows.Forms.Button();
            this.btnAllLED = new System.Windows.Forms.Button();
            this.btnLedOff = new System.Windows.Forms.Button();
            this.btnBeep = new System.Windows.Forms.Button();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.groupBox3.SuspendLayout();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(19, 31);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(50, 13);
            this.label1.TabIndex = 0;
            this.label1.Text = "ComPort:";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(289, 206);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(33, 13);
            this.label2.TabIndex = 0;
            this.label2.Text = "SNR:";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(59, 119);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(28, 13);
            this.label3.TabIndex = 0;
            this.label3.Text = "Key:";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(34, 233);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(58, 13);
            this.label4.TabIndex = 0;
            this.label4.Text = "绝对块号:";
            // 
            // coBoxComNo
            // 
            this.coBoxComNo.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.coBoxComNo.FormattingEnabled = true;
            this.coBoxComNo.Items.AddRange(new object[] {
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10"});
            this.coBoxComNo.Location = new System.Drawing.Point(75, 28);
            this.coBoxComNo.Name = "coBoxComNo";
            this.coBoxComNo.Size = new System.Drawing.Size(85, 21);
            this.coBoxComNo.TabIndex = 1;
            // 
            // txtCardSerialNo
            // 
            this.txtCardSerialNo.Location = new System.Drawing.Point(347, 200);
            this.txtCardSerialNo.Name = "txtCardSerialNo";
            this.txtCardSerialNo.Size = new System.Drawing.Size(148, 20);
            this.txtCardSerialNo.TabIndex = 2;
            // 
            // txtKey
            // 
            this.txtKey.Location = new System.Drawing.Point(104, 115);
            this.txtKey.MaxLength = 12;
            this.txtKey.Name = "txtKey";
            this.txtKey.Size = new System.Drawing.Size(134, 20);
            this.txtKey.TabIndex = 2;
            this.txtKey.Text = "FFFFFFFFFFFF";
            // 
            // coBoxBlockNo
            // 
            this.coBoxBlockNo.FormattingEnabled = true;
            this.coBoxBlockNo.Location = new System.Drawing.Point(104, 230);
            this.coBoxBlockNo.Name = "coBoxBlockNo";
            this.coBoxBlockNo.Size = new System.Drawing.Size(134, 21);
            this.coBoxBlockNo.TabIndex = 1;
            // 
            // btnOpenCom
            // 
            this.btnOpenCom.Location = new System.Drawing.Point(175, 28);
            this.btnOpenCom.Name = "btnOpenCom";
            this.btnOpenCom.Size = new System.Drawing.Size(75, 25);
            this.btnOpenCom.TabIndex = 3;
            this.btnOpenCom.Text = "Open Port";
            this.btnOpenCom.UseVisualStyleBackColor = true;
            this.btnOpenCom.Click += new System.EventHandler(this.btnOpenCom_Click);
            // 
            // btnReadCardSerialNo
            // 
            this.btnReadCardSerialNo.Location = new System.Drawing.Point(502, 200);
            this.btnReadCardSerialNo.Name = "btnReadCardSerialNo";
            this.btnReadCardSerialNo.Size = new System.Drawing.Size(75, 25);
            this.btnReadCardSerialNo.TabIndex = 3;
            this.btnReadCardSerialNo.Text = "Request";
            this.btnReadCardSerialNo.UseVisualStyleBackColor = true;
            this.btnReadCardSerialNo.Click += new System.EventHandler(this.btnReadCardSerialNo_Click);
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.rdoBtnKeyB);
            this.groupBox1.Controls.Add(this.rdoBtnKeyA);
            this.groupBox1.Location = new System.Drawing.Point(43, 154);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(195, 54);
            this.groupBox1.TabIndex = 4;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Key Mode";
            // 
            // rdoBtnKeyB
            // 
            this.rdoBtnKeyB.AutoSize = true;
            this.rdoBtnKeyB.Location = new System.Drawing.Point(115, 24);
            this.rdoBtnKeyB.Name = "rdoBtnKeyB";
            this.rdoBtnKeyB.Size = new System.Drawing.Size(53, 17);
            this.rdoBtnKeyB.TabIndex = 0;
            this.rdoBtnKeyB.Text = "Key B";
            this.rdoBtnKeyB.UseVisualStyleBackColor = true;
            // 
            // rdoBtnKeyA
            // 
            this.rdoBtnKeyA.AutoSize = true;
            this.rdoBtnKeyA.Checked = true;
            this.rdoBtnKeyA.Location = new System.Drawing.Point(24, 24);
            this.rdoBtnKeyA.Name = "rdoBtnKeyA";
            this.rdoBtnKeyA.Size = new System.Drawing.Size(53, 17);
            this.rdoBtnKeyA.TabIndex = 0;
            this.rdoBtnKeyA.TabStop = true;
            this.rdoBtnKeyA.Text = "Key A";
            this.rdoBtnKeyA.UseVisualStyleBackColor = true;
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(278, 259);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(63, 13);
            this.label5.TabIndex = 5;
            this.label5.Text = "Block Data:";
            // 
            // txtBlockData
            // 
            this.txtBlockData.Location = new System.Drawing.Point(347, 256);
            this.txtBlockData.MaxLength = 32;
            this.txtBlockData.Name = "txtBlockData";
            this.txtBlockData.Size = new System.Drawing.Size(225, 20);
            this.txtBlockData.TabIndex = 2;
            this.txtBlockData.Text = "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
            // 
            // chkBoxUseKeyGroup
            // 
            this.chkBoxUseKeyGroup.AutoSize = true;
            this.chkBoxUseKeyGroup.Location = new System.Drawing.Point(43, 76);
            this.chkBoxUseKeyGroup.Name = "chkBoxUseKeyGroup";
            this.chkBoxUseKeyGroup.Size = new System.Drawing.Size(76, 17);
            this.chkBoxUseKeyGroup.TabIndex = 6;
            this.chkBoxUseKeyGroup.Text = "Key Group";
            this.chkBoxUseKeyGroup.UseVisualStyleBackColor = true;
            this.chkBoxUseKeyGroup.CheckedChanged += new System.EventHandler(this.chkBoxUseKeyGroup_CheckedChanged);
            // 
            // coBoxKeyGroupIndex
            // 
            this.coBoxKeyGroupIndex.Enabled = false;
            this.coBoxKeyGroupIndex.FormattingEnabled = true;
            this.coBoxKeyGroupIndex.Location = new System.Drawing.Point(134, 73);
            this.coBoxKeyGroupIndex.Name = "coBoxKeyGroupIndex";
            this.coBoxKeyGroupIndex.Size = new System.Drawing.Size(104, 21);
            this.coBoxKeyGroupIndex.TabIndex = 7;
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.btnDownloadKey);
            this.groupBox2.Controls.Add(this.txtKeyGroupStr);
            this.groupBox2.Controls.Add(this.label7);
            this.groupBox2.Controls.Add(this.label6);
            this.groupBox2.Controls.Add(this.txtKeyGroupIndex);
            this.groupBox2.Location = new System.Drawing.Point(284, 28);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(317, 112);
            this.groupBox2.TabIndex = 8;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Set Key";
            // 
            // btnDownloadKey
            // 
            this.btnDownloadKey.Location = new System.Drawing.Point(213, 40);
            this.btnDownloadKey.Name = "btnDownloadKey";
            this.btnDownloadKey.Size = new System.Drawing.Size(75, 36);
            this.btnDownloadKey.TabIndex = 3;
            this.btnDownloadKey.Text = "Set";
            this.btnDownloadKey.UseVisualStyleBackColor = true;
            this.btnDownloadKey.Click += new System.EventHandler(this.btnDownloadKey_Click);
            // 
            // txtKeyGroupStr
            // 
            this.txtKeyGroupStr.Location = new System.Drawing.Point(95, 25);
            this.txtKeyGroupStr.MaxLength = 12;
            this.txtKeyGroupStr.Name = "txtKeyGroupStr";
            this.txtKeyGroupStr.Size = new System.Drawing.Size(92, 20);
            this.txtKeyGroupStr.TabIndex = 1;
            this.txtKeyGroupStr.Text = "FFFFFFFFFFFF";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(17, 75);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(36, 13);
            this.label7.TabIndex = 0;
            this.label7.Text = "Index:";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(30, 28);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(59, 13);
            this.label6.TabIndex = 0;
            this.label6.Text = "PassWord:";
            // 
            // txtKeyGroupIndex
            // 
            this.txtKeyGroupIndex.Location = new System.Drawing.Point(95, 72);
            this.txtKeyGroupIndex.Name = "txtKeyGroupIndex";
            this.txtKeyGroupIndex.Size = new System.Drawing.Size(92, 20);
            this.txtKeyGroupIndex.TabIndex = 2;
            this.txtKeyGroupIndex.Text = "0";
            // 
            // btnReadData
            // 
            this.btnReadData.Location = new System.Drawing.Point(333, 328);
            this.btnReadData.Name = "btnReadData";
            this.btnReadData.Size = new System.Drawing.Size(75, 25);
            this.btnReadData.TabIndex = 9;
            this.btnReadData.Text = "Read";
            this.btnReadData.UseVisualStyleBackColor = true;
            this.btnReadData.Click += new System.EventHandler(this.btnReadData_Click);
            // 
            // btnWriteData
            // 
            this.btnWriteData.Location = new System.Drawing.Point(485, 328);
            this.btnWriteData.Name = "btnWriteData";
            this.btnWriteData.Size = new System.Drawing.Size(75, 25);
            this.btnWriteData.TabIndex = 9;
            this.btnWriteData.Text = "Write";
            this.btnWriteData.UseVisualStyleBackColor = true;
            this.btnWriteData.Click += new System.EventHandler(this.btnWriteData_Click);
            // 
            // labelState
            // 
            this.labelState.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.labelState.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.labelState.Font = new System.Drawing.Font("新宋体", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.labelState.Location = new System.Drawing.Point(0, 430);
            this.labelState.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.labelState.Name = "labelState";
            this.labelState.Size = new System.Drawing.Size(764, 40);
            this.labelState.TabIndex = 32;
            this.labelState.Text = "Message:";
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.rdoReadBlockType_2);
            this.groupBox3.Controls.Add(this.rdoReadBlockType_1);
            this.groupBox3.Controls.Add(this.rdoReadBlockType_0);
            this.groupBox3.Location = new System.Drawing.Point(36, 277);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(202, 127);
            this.groupBox3.TabIndex = 48;
            this.groupBox3.TabStop = false;
            // 
            // rdoReadBlockType_2
            // 
            this.rdoReadBlockType_2.AutoSize = true;
            this.rdoReadBlockType_2.Location = new System.Drawing.Point(30, 92);
            this.rdoReadBlockType_2.Name = "rdoReadBlockType_2";
            this.rdoReadBlockType_2.Size = new System.Drawing.Size(95, 17);
            this.rdoReadBlockType_2.TabIndex = 48;
            this.rdoReadBlockType_2.Text = "read two block";
            this.rdoReadBlockType_2.UseVisualStyleBackColor = true;
            // 
            // rdoReadBlockType_1
            // 
            this.rdoReadBlockType_1.AutoSize = true;
            this.rdoReadBlockType_1.Location = new System.Drawing.Point(30, 59);
            this.rdoReadBlockType_1.Name = "rdoReadBlockType_1";
            this.rdoReadBlockType_1.Size = new System.Drawing.Size(117, 17);
            this.rdoReadBlockType_1.TabIndex = 47;
            this.rdoReadBlockType_1.Text = "read block 32 to 38";
            this.rdoReadBlockType_1.UseVisualStyleBackColor = true;
            // 
            // rdoReadBlockType_0
            // 
            this.rdoReadBlockType_0.AutoSize = true;
            this.rdoReadBlockType_0.Checked = true;
            this.rdoReadBlockType_0.Location = new System.Drawing.Point(30, 25);
            this.rdoReadBlockType_0.Name = "rdoReadBlockType_0";
            this.rdoReadBlockType_0.Size = new System.Drawing.Size(111, 17);
            this.rdoReadBlockType_0.TabIndex = 45;
            this.rdoReadBlockType_0.TabStop = true;
            this.rdoReadBlockType_0.Text = "read block 0 to 31";
            this.rdoReadBlockType_0.UseVisualStyleBackColor = true;
            // 
            // btnGreenLED
            // 
            this.btnGreenLED.Location = new System.Drawing.Point(638, 44);
            this.btnGreenLED.Name = "btnGreenLED";
            this.btnGreenLED.Size = new System.Drawing.Size(75, 25);
            this.btnGreenLED.TabIndex = 49;
            this.btnGreenLED.Text = "Green LED";
            this.btnGreenLED.UseVisualStyleBackColor = true;
            this.btnGreenLED.Click += new System.EventHandler(this.btnGreenLED_Click);
            // 
            // btnRedLED
            // 
            this.btnRedLED.Location = new System.Drawing.Point(638, 107);
            this.btnRedLED.Name = "btnRedLED";
            this.btnRedLED.Size = new System.Drawing.Size(75, 25);
            this.btnRedLED.TabIndex = 49;
            this.btnRedLED.Text = "Red LED";
            this.btnRedLED.UseVisualStyleBackColor = true;
            this.btnRedLED.Click += new System.EventHandler(this.btnRedLED_Click);
            // 
            // btnAllLED
            // 
            this.btnAllLED.Location = new System.Drawing.Point(638, 172);
            this.btnAllLED.Name = "btnAllLED";
            this.btnAllLED.Size = new System.Drawing.Size(75, 25);
            this.btnAllLED.TabIndex = 49;
            this.btnAllLED.Text = "All LED";
            this.btnAllLED.UseVisualStyleBackColor = true;
            this.btnAllLED.Click += new System.EventHandler(this.btnYellowLED_Click);
            // 
            // btnLedOff
            // 
            this.btnLedOff.Location = new System.Drawing.Point(638, 246);
            this.btnLedOff.Name = "btnLedOff";
            this.btnLedOff.Size = new System.Drawing.Size(75, 25);
            this.btnLedOff.TabIndex = 49;
            this.btnLedOff.Text = "LED OFF";
            this.btnLedOff.UseVisualStyleBackColor = true;
            this.btnLedOff.Click += new System.EventHandler(this.btnLedOff_Click);
            // 
            // btnBeep
            // 
            this.btnBeep.Location = new System.Drawing.Point(638, 328);
            this.btnBeep.Name = "btnBeep";
            this.btnBeep.Size = new System.Drawing.Size(75, 25);
            this.btnBeep.TabIndex = 49;
            this.btnBeep.Text = "Beep";
            this.btnBeep.UseVisualStyleBackColor = true;
            this.btnBeep.Click += new System.EventHandler(this.btnBeep_Click);
            // 
            // FrmMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(764, 470);
            this.Controls.Add(this.btnBeep);
            this.Controls.Add(this.btnLedOff);
            this.Controls.Add(this.btnAllLED);
            this.Controls.Add(this.btnRedLED);
            this.Controls.Add(this.btnGreenLED);
            this.Controls.Add(this.groupBox3);
            this.Controls.Add(this.labelState);
            this.Controls.Add(this.btnWriteData);
            this.Controls.Add(this.btnReadData);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.coBoxKeyGroupIndex);
            this.Controls.Add(this.chkBoxUseKeyGroup);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.btnReadCardSerialNo);
            this.Controls.Add(this.btnOpenCom);
            this.Controls.Add(this.txtKey);
            this.Controls.Add(this.txtBlockData);
            this.Controls.Add(this.txtCardSerialNo);
            this.Controls.Add(this.coBoxBlockNo);
            this.Controls.Add(this.coBoxComNo);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Name = "FrmMain";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "NfcPass RFID Reader Test Demo";
            this.Load += new System.EventHandler(this.FrmMain_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.ComboBox coBoxComNo;
        private System.Windows.Forms.TextBox txtCardSerialNo;
        private System.Windows.Forms.TextBox txtKey;
        private System.Windows.Forms.ComboBox coBoxBlockNo;
        private System.Windows.Forms.Button btnOpenCom;
        private System.Windows.Forms.Button btnReadCardSerialNo;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.TextBox txtBlockData;
        private System.Windows.Forms.RadioButton rdoBtnKeyB;
        private System.Windows.Forms.RadioButton rdoBtnKeyA;
        private System.Windows.Forms.CheckBox chkBoxUseKeyGroup;
        private System.Windows.Forms.ComboBox coBoxKeyGroupIndex;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.TextBox txtKeyGroupStr;
        private System.Windows.Forms.TextBox txtKeyGroupIndex;
        private System.Windows.Forms.Button btnDownloadKey;
        private System.Windows.Forms.Button btnReadData;
        private System.Windows.Forms.Button btnWriteData;
        private System.Windows.Forms.Label labelState;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.RadioButton rdoReadBlockType_2;
        private System.Windows.Forms.RadioButton rdoReadBlockType_1;
        private System.Windows.Forms.RadioButton rdoReadBlockType_0;
        private System.Windows.Forms.Button btnGreenLED;
        private System.Windows.Forms.Button btnRedLED;
        private System.Windows.Forms.Button btnAllLED;
        private System.Windows.Forms.Button btnLedOff;
        private System.Windows.Forms.Button btnBeep;
    }
}

