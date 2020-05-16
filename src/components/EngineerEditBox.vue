<template>
  <div class="dialog-container-query modal-float">
    <div class="modal-content">
      <div class="modal-header">
        <h4>修改用户信息</h4>
      </div>2
      <div v-bind:class="['form-group' , helpText_id?'has-error':'']">
        <label for="idBox">编号</label>
        <input
          v-bind:disabled="update"
          type="ID"
          class="form-control"
          id="idBox"
          placeholder="编号"
          v-model="box_id"
        />
        <span v-if="helpText_id" class="help-block">{{ helpText_id }}</span>
      </div>
      <div v-bind:class="['form-group' , helpText_name?'has-error':'']">
        <label for="nameBox">姓名</label>
        <input type="text" class="form-control" id="nameBox" placeholder="姓名" v-model="box_name" />
        <span v-if="helpText_name" class="help-block">{{ helpText_name }}</span>
      </div>
      <div v-bind:class="['form-group' , helpText_sex?'has-error':'']">
        <label for="sexBox">性别</label>
        <select class="form-control" id="sexBox" v-model="box_sex">
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
        <!-- <input type="text" class="form-control" id="sexBox" placeholder="性别" v-model="box_sex" /> -->
        <span v-if="helpText_sex" class="help-block">{{ helpText_sex }}</span>
      </div>
      <div v-bind:class="['form-group' , helpText_birthday?'has-error':'']">
        <label for="birthdayBox">生日</label>
        <input
          type="date"
          class="form-control"
          id="birthdayBox"
          placeholder="生日"
          min="1900-1-1"
          max="2004-12-31"
          :value="box_birthday && box_birthday.toISOString().split('T')[0]"
          @input="box_birthday = $event.target.valueAsDate"
        />
        <span v-if="helpText_birthday" class="help-block">{{ helpText_birthday }}</span>
      </div>
      <div v-bind:class="['form-group' , helpText_education?'has-error':'']">
        <label for="educationBox">学历</label>
        <input
          type="text"
          class="form-control"
          id="educationBox"
          placeholder="学历"
          v-model="box_education"
        />
        <span v-if="helpText_education" class="help-block">{{ helpText_education }}</span>
      </div>
      <div v-bind:class="['form-group' , helpText_hometown?'has-error':'']">
        <label for="hometownBox">籍贯</label>
        <input
          type="text"
          class="form-control"
          id="hometownBox"
          placeholder="籍贯"
          v-model="box_hometown"
        />
        <span v-if="helpText_hometown" class="help-block">{{ helpText_hometown }}</span>
      </div>
      <div v-bind:class="['form-group' , helpText_address?'has-error':'']">
        <label for="addressBox">地址</label>
        <input
          type="text"
          class="form-control"
          id="addressBox"
          placeholder="地址"
          v-model="box_address"
        />
        <span v-if="helpText_address" class="help-block">{{ helpText_address }}</span>
      </div>
      <div v-bind:class="['form-group' , helpText_phoneNumber?'has-error':'']">
        <label for="phoneNumberBox">电话</label>
        <input
          type="text"
          class="form-control"
          id="phoneNumberBox"
          placeholder="电话"
          v-model="box_phoneNumber"
        />
        <span v-if="helpText_phoneNumber" class="help-block">{{ helpText_phoneNumber }}</span>
      </div>
      <div v-bind:class="['form-group' , helpText_seniority?'has-error':'']">
        <label for="seniorityBox">工龄</label>
        <input
          type="text"
          class="form-control"
          id="seniorityBox"
          placeholder="工龄"
          v-model="box_seniority"
        />
        <span v-if="helpText_seniority" class="help-block">{{ helpText_seniority }}</span>
      </div>
      <div v-bind:class="['form-group' , helpText_wage?'has-error':'']">
        <label for="wageBox">基本薪水</label>
        <input type="text" class="form-control" id="wageBox" placeholder="基本薪水" v-model="box_wage" />
        <span v-if="helpText_wage" class="help-block">{{ helpText_wage }}</span>
      </div>
    </div>
    <div class="modal-footer">
      <input
        class="btn btn-success"
        type="button"
        value="确定"
        v-bind:disabled="(helpText_id||helpText_name||helpText_sex||helpText_birthday||helpText_education||helpText_hometown||helpText_address||helpText_phoneNumber||helpText_seniority||helpText_wage)?true:false"
        @click="okHandle"
      />
      <input class="btn btn-danger" type="button" value="取消" @click="cancelHandle" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      helpText_id: "",
      helpText_name: "",
      helpText_sex: "",
      helpText_birthday: "",
      helpText_education: "",
      helpText_hometown: "",
      helpText_address: "",
      helpText_phoneNumber: "",
      helpText_seniority: "",
      helpText_wage: "",

      box_id: 0,
      box_name: "",
      box_sex: "",
      box_birthday: new Date(1900, 1, 1),
      box_education: "",
      box_hometown: "",
      box_address: "",
      box_phoneNumber: "",
      box_seniority: 0,
      box_wage: 0
    };
  },
  props: {
    update: Boolean,
    id: Number,
    name: String,
    sex: String,
    birthday: Date,
    education: String,
    hometown: String,
    address: String,
    phoneNumber: String,
    seniority: Number,
    wage: Number
  },
  methods: {
    okHandle() {
      let arg = {
        id: this.box_id,
        name: this.box_name,
        sex: this.box_sex,
        birthday: this.box_birthday,
        education: this.box_education,
        hometown: this.box_hometown,
        address: this.box_address,
        phoneNumber: this.box_phoneNumber,
        seniority: this.box_seniority,
        wage: this.box_wage
      };
      this.$emit("ok", arg);
    },
    cancelHandle() {
      this.$emit("cancel");
    }
  },
  watch: {
    update: {
      immediate: true,
      handler(val, oldVal) {
        this.box_id = this.id;
        this.box_name = this.name;
        this.box_sex = this.sex;
        this.box_birthday = this.birthday;
        this.box_education = this.education;
        this.box_hometown = this.hometown;
        this.box_address = this.address;
        this.box_phoneNumber = this.phoneNumber;
        this.box_seniority = this.seniority;
        this.box_wage = this.wage;
      }
    },
    box_id: {
      immediate: true,
      handler(val, oldVal) {
        if (!this.box_id) {
          this.helpText_id = "编号不能为空";
          return;
        }
        this.box_id = this.box_id.replace(/[^\d]/g, "");
        if (this.box_id.length > 4) this.helpText_id = "编号不能超过4位";
        else if (this.box_id != this.id) {
          let arg = {
            id: this.box_id,
            err: ""
          };
          this.$emit("validID", arg);
          this.helpText_id = arg.err;
        } else this.helpText_id = "";
      }
    },
    box_name: {
      immediate: true,
      handler(val, oldVal) {
        if (!this.box_name) this.helpText_name = "姓名不能为空";
        else if (this.box_name.length > 20)
          this.helpText_name = "姓名长度不能超过20个字符";
        else this.helpText_name = "";
      }
    },
    box_sex: {
      immediate: true,
      handler(val, oldVal) {
        if (!this.box_sex) this.helpText_sex = "性别不能为空";
        else {
          switch (this.box_sex) {
            case "男":
            case "女":
              this.helpText_sex = "";
              break;
            default:
              this.helpText_sex = "性别只能为男或女";
          }
        }
      }
    },
    box_birthday: {
      immediate: true,
      handler(val, oldVal) {
        if (!this.box_birthday) this.helpText_birthday = "生日不能为空";
        else if (this.box_birthday < new Date(1900, 1, 1))
          this.helpText_birthday = "生日不能早于1900-01-01";
        else if (this.box_birthday > new Date(2004, 12, 31))
          this.helpText_birthday = "生日不能晚于2004-12-31";
        else this.helpText_birthday = "";
      }
    },
    box_education: {
      immediate: true,
      handler(val, oldVal) {
        if (!this.box_education) this.helpText_education = "学历不能为空";
        else if (this.education > 10)
          this.helpText_education = "学历不能长于10";
        else this.helpText_education = "";
      }
    },
    box_hometown: {
      immediate: true,
      handler(val, oldVal) {
        if (!this.box_hometown) this.helpText_hometown = "籍贯不能为空";
        else if (this.hometown > 10) this.helpText_hometown = "籍贯不能长于10";
        else this.helpText_hometown = "";
      }
    },
    box_address: {
      immediate: true,
      handler(val, oldVal) {
        if (!this.box_address) this.helpText_address = "地址不能为空";
        else if (this.address > 30) this.helpText_address = "地址不能长于30";
        else this.helpText_address = "";
      }
    },
    box_phoneNumber: {
      immediate: true,
      handler(val, oldVal) {
        if (!this.box_phoneNumber) this.helpText_phoneNumber = "电话不能为空";
        else if (this.box_phoneNumber.length != 11)
          this.helpText_phoneNumber = "电话号码长度必须为11";
        else this.helpText_phoneNumber = "";
      }
    },
    box_seniority: {
      immediate: true,
      handler(val, oldVal) {
        if (!this.box_seniority) this.helpText_seniority = "工龄不能为0";
        else if (this.box_seniority >= 50)
          this.helpText_seniority = "工龄不能超过50";
        else this.helpText_seniority = "";
      }
    },
    box_wage: {
      immediate: true,
      handler(val, oldVal) {
        if (!this.box_wage) this.helpText_wage = "工资不能为0";
        else this.helpText_wage = "";
      }
    }
  }
};
</script>

<style scoped>
p,
h4 {
  margin: 0;
}
.modal-float {
  float: left;
  position: absolute;
  width: 100%;
}
.modal-header {
  color: #fff;
  background: #337ab7;
  border-radius: 6px 6px 0 0;
  padding: 15px 10px;
  margin-bottom: 15px;
  border-bottom: 1px solid #5e9fa1;
}
.form-group {
  padding: 0px 10px;
  -webkit-padding-start: 15px;
}
.modal-footer {
  padding: 15px;
  text-align: right;
  border-top: 1px solid #e5e5e5;
}
</style>