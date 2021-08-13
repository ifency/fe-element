<template>
  <div class="el-select-tree">
    <el-popover
      ref="elPopover"
      v-model="visible"
      transition="el-zoom-in-top"
      trigger="click"
      :disabled="disabled"
      :placement="placement"
      :width="popverWidth"
    >
      <!-- @after-leave="handleScroll()" -->
      <el-scrollbar
        wrap-class="el-select-dropdown__wrap"
        view-class="el-select-dropdown__list"
        ref="scrollbae"
      >
        <el-tree
          ref="elTree"
          class="el-select-tree__list"
          :default-expanded-keys="defaultExpandedKeys"
          :show-checkbox="multiple"
          :expand-on-click-node="multiple"
          :style="{ 'min-width': minWidth + 'px' }"
          @node-click="nodeClick"
          @check-change="checkChange"
          :data="data"
          :props="props"
          :node-key="propsValue"
          :default-checked-keys="defaultCheckedAll"
          :check-strictly="checkStrictly"
          :lazy="lazy"
          :load="load"
          :icon-class="iconClass"
          :indent="indent"
          :accordion="accordion"
          :filter-node-method="filterNodeMethod"
          :auto-expand-parent="autoExpandParent"
          :render-content="renderContent"
          :render-after-expand="renderAfterExpand"
        >
        </el-tree>
      </el-scrollbar>
      <template #reference>
        <el-input
          v-model="selectedLabel"
          ref="reference"
          readonly
          :validate-event="false"
          :disabled="disabled"
          :placeholder="placeholder"
          :class="{
            'is-active': visible,
            'is-selected': selectedLabel,
            'is-clearable': clearable,
          }"
        >
          <template #suffix>
            <i
              v-if="clearable"
              @click.stop="clear()"
              class="el-input__icon el-input__icon-close el-icon-ircle-close"
            ></i>
            <i
              class="
                el-input__icon el-input__icon-arrow-down
                el-icon-arrow-down
              "
            ></i>
          </template>
        </el-input>
      </template>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    // 展示的数据
    data: {
      type: Array,
      default: () => [],
    },
    // 配置
    props: {
      type: Object,
      default() {
        return {
          label: "label",
          children: "children",
          disabled: "disabled",
          isLeaf: "isLeaf",
        };
      },
    },
    // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
    checkStrictly: Boolean,
    // 每个树节点唯一的属性
    nodeKey: String,
    // 是否默认展开所有节点，默认false
    defaultExpandAll: Boolean,
    // 是否懒加载子节点，需与load方法结合使用
    lazy: Boolean,
    // load方法
    load: Function,
    // 自定义树节点的图标
    iconClass: String,
    // 相邻级节点间的水平缩进，单位px
    indent: Number,
    // 是否每次只打开一个同级树节点展开
    accordion: Boolean,
    // 对树节点进行筛选时执行的方法
    filterNodeMethod: Function,
    // 展开子节点的时候是否自动展开父节点
    autoExpandParent: {
      type: Boolean,
      default: true,
    },
    // 树节点的内容区渲染
    renderContent: Function,
    // 是否在第一次展开某个树节点后才渲染其子节点
    renderAfterExpand: Boolean,
    // [el-tree] forwarding parameters end
    // 是否清除
    clearable: Boolean,
    // 占位符
    placeholder: {
      type: String,
      default: "请选择",
    },
    // 出现位置
    placement: {
      type: String,
      default: "bottom-start",
    },
    // 大小
    // size: {
    //   type: String,
    //   default: Vue.prototype.$ELEMENT ? Vue.prototype.$ELEMENT.size : "",
    // },
    // 是否禁用
    disabled: Boolean,
    // 是否支持多选
    multiple: Boolean,
    // v-model的双向绑定值
    modelValue: {
      type: [Number, String, Array],
      default: "",
    },
    // // popover的宽度
    // popoverWidth: Number,
  },
  emits: ["update:modelValue"],
  computed: {
    propsValue() {
      return this.nodeKey || this.modelValue || "value";
    },
    propsLabel() {
      return this.label || "label";
    },
  },
  data() {
    return {
      visible: false,
      selectedLabel: "",
      popverWidth: "320",
    };
  },
  mounted() {
    this.setSelected();
    // 更新popver的宽度
    this.$nextTick(() => {
      const { width } = this.$refs.reference.$el.getBoundingClientRect();
      this.popverWidth = width;
    });
  },
  watch: {
    modelValue() {
      this.setSelected();
    },
    data() {
      this.setSelected();
    },
  },
  methods: {
    valueChange(value, node) {
      console.log(
        "🚀 ~ file: fe-select-tree.vue ~ line 188 ~ valueChange ~ value, node",
        value,
        node
      );
      this.$emit("update:modelValue", value);
      this.$emit("change", value, node);
    },
    nodeClick(data, node, component) {
      const children = data[this.props.children];
      console.log(
        "🚀 ~ file: fe-select-tree.vue ~ line 193 ~ nodeClick ~ children",
        children
      );
      const value = data[this.propsValue];
      console.log(
        "🚀 ~ file: fe-select-tree.vue ~ line 194 ~ nodeClick ~ value",
        value
      );
      console.log(
        "🚀 ~ file: fe-select-tree.vue ~ line 214 ~ nodeClick ~ this.value",
        this.modelValue
      );
      console.log(
        "🚀 ~ file: fe-select-tree.vue ~ line 202 ~ nodeClick ~ this.multiple",
        this.multiple
      );
      if (
        ((children && children.length) ||
          (this.lazy && !data[this.propsIsLeaf])) &&
        !this.checkStrictly
      ) {
        component.ctx.handleExpandIconClick();
      } else if (!this.multiple && !data.disabled) {
        if (value !== this.modelValue) {
          this.valueChange(value, data);
          this.selectedLabel = data[this.propsLabel];
        }
        this.visible = false;
        console.log(
          "🚀 ~ file: fe-select-tree.vue ~ line 207 ~ nodeClick ~ this.visible",
          this.visible
        );
      }
    },
    setSelected() {
      const { elTree } = this.$refs;
      if (this.multiple) {
        elTree.setCheckedKeys(this.modelValue);
        this.setMultipleSelectedLabel();
      } else {
        const selectedNode = elTree.getNode(this.modelValue);
        this.selectedLabel = selectedNode
          ? selectedNode.data[this.propsLabel]
          : "";
      }
    },
    setMultipleSelectedLabel() {
      const { elTree } = this.$refs;
      const selectedNodes = elTree.getCheckedNodes(!this.checkStrictly);
      this.selectedLabel = selectedNodes
        .map((item) => item[this.propsLabel])
        .join(",");
    },
  },
};
</script>

<style lang="scss"></style>
