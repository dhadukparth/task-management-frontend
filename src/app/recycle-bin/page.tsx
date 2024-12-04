'use client';
import { BREADCRUMB_RECYCLE_BIN_ITEMS } from '@/constant/breadcrumb-menulist';
import { useBreadcrumb } from '@/context/breadcrumb-context';
import React from 'react';
import { BinDropDownList } from '../../constant';

const Page = () => {
  const { breadcrumbChange } = useBreadcrumb();
  const [tableData, setTableData] = React.useState({
    currentTable: BinDropDownList[0],
    tableLoading: true,
    tableData: [],
    columnList: []
  });

  React.useEffect(() => {
    breadcrumbChange(BREADCRUMB_RECYCLE_BIN_ITEMS.ROOT);
  }, []);

  // const allDeletePermissionsList = BACKEND_APIS.PERMISSIONS.API_TEMP_DELETE_PERMISSION_LIST();
  // const allDeleteRolesList = BACKEND_APIS.ROLES.API_GET_ALL_DELETE_ROLES();
  // if (allDeletePermissionsList.error || allDeleteRolesList.error) return <p>Error loading items</p>;

  // // NOTE: temp permissions delete list api calling function here
  // if (tableData.currentTable.value === 'permissions') {
  //   const tempDeletePermissionList: any = allDeletePermissionsList.data;
  //   const deletePermissionDataList: any = tempDeletePermissionList?.data?.map(
  //     (item: any, index: any) => ({
  //       id: index + 1,
  //       permissionId: item?._id,
  //       status: item?.is_active
  //         ? { label: 'Active', status: 'success' }
  //         : { label: 'In Active', status: 'danger' },
  //       name: item?.name,
  //       created_at: item?.created_at
  //     })
  //   );
  //   const TableColumnList: any = DeletePermissionColumns(allDeletePermissionsList.refetch);
  //   setTableData({
  //     ...tableData,
  //     tableLoading: allDeletePermissionsList.isLoading,
  //     tableData: deletePermissionDataList,
  //     columnList: TableColumnList
  //   });
  // } 
  // // NOTE: temp roles delete list api calling function here
  // else if (tableData.currentTable.value === 'roles') {
  //   const tempDeleteRecordList: any = allDeleteRolesList.data;
  //   const deletePermissionDataList: any = tempDeleteRecordList?.data?.map(
  //     (item: any, index: any) => ({
  //       id: index + 1,
  //       permissionId: item?._id,
  //       status: item?.is_active
  //         ? { label: 'Active', status: 'success' }
  //         : { label: 'In Active', status: 'danger' },
  //       name: item?.name,
  //       created_at: item?.created_at
  //     })
  //   );
  //   const TableColumnList: any = DeleteRolesColumns(allDeleteRolesList.refetch);
  //   setTableData({
  //     ...tableData,
  //     tableLoading: allDeletePermissionsList.isLoading,
  //     tableData: deletePermissionDataList,
  //     columnList: TableColumnList
  //   });
  // }

  // const tableLeftSideSection = () => {
  //   const handleChangeValue = (value: string) => {
  //     const getFindValue: any = BinDropDownList.find((item) => item.value === value);
  //     setTableData({ ...tableData, currentTable: getFindValue });
  //   };

  //   return (
  //     <div className="max-w-60 w-full">
  //       {tableData.tableLoading ? (
  //         <Skeleton className="w-full h-8" />
  //       ) : (
  //         <Select
  //           name="currentTable"
  //           onValueChange={handleChangeValue}
  //           defaultValue={tableData?.currentTable?.value}
  //         >
  //           <SelectTrigger>
  //             <SelectValue placeholder={tableData?.currentTable?.value} />
  //           </SelectTrigger>
  //           <SelectContent>
  //             {BinDropDownList?.map((list) => (
  //               <SelectItem value={list.value} key={list.value} className="capitalize">
  //                 {list.label}
  //               </SelectItem>
  //             ))}
  //           </SelectContent>
  //         </Select>
  //       )}
  //     </div>
  //   );
  // };

  return (
    <div>
      {/* <DataTable
        loading={tableData.tableLoading}
        dataList={tableData.tableData ?? []}
        columnsList={tableData?.columnList}
        leftSideSection={tableLeftSideSection()}
      /> */}
    </div>
  );
};

export default Page;
