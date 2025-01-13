<template>
  <el-table
      ref="multipleTableRef"
      :data="tableData"
      row-key="id"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @expand-change="expandChange"
  >
    <el-table-column width="55" type="expand">
      <template #default="scope">
        <el-table ref="childRef" @select="childSelect" :data="scope.row.childData">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="age" label="age" />
        </el-table>
      </template>
    </el-table-column>
    <el-table-column type="selection" :selectable="selectable" width="55" />
    <el-table-column label="Date" width="120">
      <template #default="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column property="name" label="Name" width="120" />
    <el-table-column property="address" label="Address" />
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">
      Toggle selection status of second and third rows
    </el-button>
    <el-button @click="toggleSelection([tableData[1], tableData[2]], false)">
      Toggle selection status based on selectable
    </el-button>
    <el-button @click="toggleSelection()">Clear selection</el-button>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, ref} from 'vue'
import type { TableInstance } from 'element-plus'

interface Child {
  name: string
  age: number
  selected: boolean
}
interface User {
  id: number
  date: string
  name: string
  address: string
  childData?: Child[]
}

const multipleTableRef = ref<TableInstance>()
const multipleSelection = ref<User[]>([])
const childRef = ref<TableInstance>()
const selectable = (row: User) => ![1, 2].includes(row.id)
const toggleSelection = (rows?: User[], ignoreSelectable?: boolean) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value!.toggleRowSelection(
          row,
          undefined,
          ignoreSelectable
      )
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

function childSelect(selection: Child[], row: Child) {
  row.selected = !(row.selected)
}
function expandChange(row: User) {
  nextTick(() => {
    row.childData?.forEach((item) => {
      if (item.selected) {
        childRef.value?.toggleRowSelection(item)
      }
    })
  })
}
const tableData: User[] = [
  {
    id: 1,
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    childData: [
      {name: 'zs', age: 22, selected: false},
      {name: 'ls', age: 24, selected: false}
    ]
  },
  {
    id: 2,
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    childData: [
      {name: 'zs', age: 22, selected: false},
      {name: 'ls', age: 24, selected: false}
    ]
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    childData: [
      {name: 'zs', age: 22, selected: false},
      {name: 'ls', age: 24, selected: false}
    ]
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    childData: [
      {name: 'zs', age: 22, selected: false},
      {name: 'ls', age: 24, selected: false}
    ]
  },
  {
    id: 5,
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    childData: [
      {name: 'zs', age: 22, selected: false},
      {name: 'ls', age: 24, selected: false}
    ]
  },
  {
    id: 6,
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    childData: [
      {name: 'zs', age: 22, selected: false},
      {name: 'ls', age: 24, selected: false}
    ]
  },
  {
    id: 7,
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    childData: [
      {name: 'zs', age: 22, selected: false},
      {name: 'ls', age: 24, selected: false}
    ]
  },
]
</script>
