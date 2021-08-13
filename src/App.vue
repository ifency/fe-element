<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
    <fe-button loading type="primary">测试</fe-button>
    <fe-select-tree
      style="width: 40%"
      node-key="id"
      :data="treeData"
      :props="treeProps"
      v-model="value"
    ></fe-select-tree>
    <el-input v-model="value"></el-input>
  </div>
</template>

<script>
// import { ref } from "vue";
// import HelloWorld from "./components/HelloWorld.vue";
import FeButton from "./components/fe-button.vue";
import FeSelectTree from "./components/fe-select-tree.vue";

export default {
  components: {
    FeButton,
    FeSelectTree,
  },
  data() {
    return {
      treeData: [
        {
          label: "新疆维吾尔自治区",
          id: "1",
          childrens: [
            {
              label: "乌鲁木齐市",
              id: "2",
              childrens: [
                { label: "达坂城区", id: "7", childrens: [] },
                { label: "头屯河区", id: "8", childrens: [] },
                { label: "乌鲁木齐县", id: "9", childrens: [] },
              ],
            },
            {
              label: "克拉玛依市",
              id: "3",
              disabled: true,
              childrens: [
                {
                  label: "克拉玛依区",
                  id: "10",
                  disabled: true,
                  childrens: [],
                },
                { label: "白碱滩区", id: "11", disabled: true, childrens: [] },
                { label: "独山子区", id: "12", disabled: true, childrens: [] },
              ],
            },
            { label: "吐鲁番地区", id: "4", childrens: [] },
            { label: "哈密地区", id: "5", childrens: [] },
            { label: "昌吉回族自治州", id: "6", childrens: [] },
          ],
        },
      ],
      value: "2",
      treeProps: {
        children: "childrens",
        label: "label",
      },
    };
  },
};

// const treeData = ref([]);
// const value = ref("");
// const

// treeData.value = [
//   {
//     label: "新疆维吾尔自治区",
//     id: "1",
//     childrens: [
//       {
//         label: "乌鲁木齐市",
//         id: "2",
//         childrens: [
//           { label: "达坂城区", id: "7", childrens: [] },
//           { label: "头屯河区", id: "8", childrens: [] },
//           { label: "乌鲁木齐县", id: "9", childrens: [] },
//         ],
//       },
//       {
//         label: "克拉玛依市",
//         id: "3",
//         disabled: true,
//         childrens: [
//           {
//             label: "克拉玛依区",
//             id: "10",
//             disabled: true,
//             childrens: [],
//           },
//           { label: "白碱滩区", id: "11", disabled: true, childrens: [] },
//           { label: "独山子区", id: "12", disabled: true, childrens: [] },
//         ],
//       },
//       { label: "吐鲁番地区", id: "4", childrens: [] },
//       { label: "哈密地区", id: "5", childrens: [] },
//       { label: "昌吉回族自治州", id: "6", childrens: [] },
//     ],
//   },
// ];
// value.value = "2";

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md

//  :default-expand-all="defaultExpandAll"
//     :multiple="multiple"
//     :placeholder="placeholder"
//     :disabled="disabled"
//     :data="treeData"
//     :props="treeProps"
//     :check-strictly="checkStrictly"
//     :clearable="clearable"
//     :popover-width="popoverWidth"
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
