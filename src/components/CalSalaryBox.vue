<template>
  <div class="mask">
    <div class="dialog-container-query modal-float">
      <div class="modal-content">
        <div class="modal-header">
          <h4>计算薪水</h4>
        </div>
        <div class="form-group">
          <label for="wageBox">基本工资</label>
          <p class="form-control-static">{{wage}}</p>
        </div>
        <div v-bind:class="['form-group',effectivework>30?'has-warning':'']">
          <label for="effectiveworkBox">月有效工作日天数</label>
          <input
            type="text"
            class="form-control"
            id="effectiveworkBox"
            placeholder="月有效工作日天数"
            v-model="effectivework"
          />
        </div>
        <div class="form-group">
          <label for="benefitBox">月效益</label>
          <input
            type="text"
            class="form-control"
            id="benefitBox"
            placeholder="月效益"
            v-model="benefit"
          />
        </div>
        <div v-bind:class="['form-group',workyears>50?'has-warning':'']">
          <label for="workyearsBox">工作年限</label>
          <input
            type="text"
            class="form-control"
            id="workyearsBox"
            placeholder="工作年限"
            v-model="workyears"
          />
        </div>
        <div class="form-group">
          <label for="insuranceBox">月保险金</label>
          <input
            type="text"
            class="form-control"
            id="insuranceBox"
            placeholder="月保险金"
            v-model="insurance"
          />
        </div>
        <div class="form-group">
          <label for="wageBox">薪水</label>
          <p class="form-control-static">{{salary}}</p>
        </div>
      </div>
      <div class="modal-footer">
        <input class="btn btn-primary" type="button" value="完成" @click="finishHandle" />
      </div>
    </div>
    <div />
  </div>
</template>

<script>
export default {
  data() {
    return {
      wage: 0,
      effectivework: null,
      benefit: null,
      workyears: null,
      insurance: null
    };
  },
  methods: {
    finishHandle() {
      this.$destroy();
      $(this.$el).remove();
    }
  },
  computed: {
    salary() {
      return (
        (this.wage +
          10 * this.effectivework +
          (this.benefit * this.workyears) / 100) *
          0.9 -
        this.insurance
      );
    }
  }
};
</script>

<style scoped>
p,
h4 {
  margin: 0;
}
.mask {
  top: 0;
  left: 0;
  background: rgba(100, 100, 100, 0.5);
  position: fixed;
  width: 100vw;
  height: 100vh;
}

.modal-float {
  float: left;
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 600px;
  margin-top: 60px;
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