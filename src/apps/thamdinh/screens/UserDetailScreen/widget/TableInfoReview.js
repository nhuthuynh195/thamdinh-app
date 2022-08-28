import React from 'react';
import * as Animatable from 'react-native-animatable';

import { Text, Button } from '@core/components';
import styleConfigs from '@configs/style';
import { formatMoney } from '@core/utils/func';
import { TitleTableReview, TableReview, RowTableReview, RowExplainReview } from './index';

export const TableBusiness = (props) => {
    const { visible, nameTable, dataTable } = props;
    return visible ? <Animatable.View animation={"slideInDown"} duration={300}>
        <TitleTableReview
            title={nameTable}
            editInfoReview={() => props.showpopupEditInfoBusiness()}
        />
        <TableReview>
            <RowTableReview
                isNotBorder={true}
                title={"Số lượng"}
                value={`${dataTable.so_luong ? formatMoney(dataTable.so_luong) : ''}`}
            />
            <RowTableReview
                title={"Đơn giá"}
                value={`${dataTable.don_gia ? formatMoney(dataTable.don_gia) : ''} VND`}
            />
            <RowTableReview
                title={"Thành tiền (ngày)"}
                value={`${dataTable.thanh_tien_ngay ? formatMoney(dataTable.thanh_tien_ngay) : ''} VND`}
            />
            <RowTableReview
                title={"Thành tiền (tháng)"}
                value={`${dataTable.thanh_tien_thang ? formatMoney(dataTable.thanh_tien_thang) : ''} VND`}
            />
            <RowExplainReview explain={dataTable.dien_giai ? dataTable.dien_giai : ''} />
        </TableReview>
    </Animatable.View>
        : null
}

export const TablePersonal = (props) => {
    const { visible, nameTable, dataTable } = props;
    return visible ? <Animatable.View animation={"slideInDown"} duration={300}>
        <TitleTableReview
            title={nameTable}
            editInfoReview={() => props.editInfoReview(dataTable)}
        />
        <TableReview>
            {/* <RowTableReview
                title={"Thành tiền (ngày)"}
                value={`${dataTable.thanh_tien_ngay ? formatMoney(dataTable.thanh_tien_ngay) : ''} VND`}
            /> */}
            <RowTableReview
                title={"Thành tiền (tháng)"}
                value={`${dataTable.thanh_tien_thang ? formatMoney(dataTable.thanh_tien_thang) : ''} VND`}
            />
            <RowExplainReview
                explain={`${dataTable.dien_giai ? dataTable.dien_giai : ''}`}
            />
        </TableReview>
    </Animatable.View>
        : null
}

export const TableBusinessCapital = (props) => {
    const { visible, nameTable, dataTable } = props;
    return visible ? <Animatable.View animation={"slideInDown"} duration={300}>
        <TitleTableReview
            title={nameTable}
            editInfoReview={() => props.showpopupEditInfoBusiness()}
        />
        <TableReview>
            <RowTableReview
                isNotBorder={true}
                title={"Số lượng"}
                value={`${dataTable.so_luong ? formatMoney(dataTable.so_luong) : ''}`}
            />
            <RowTableReview
                title={"Đơn giá"}
                value={`${dataTable.don_gia ? formatMoney(dataTable.don_gia) : ''} VND`}
            />
            <RowTableReview
                title={"Thành tiền (ngày)"}
                value={`${dataTable.thanh_tien_ngay ? formatMoney(dataTable.thanh_tien_ngay) : ''} VND`}
            />
            <RowTableReview
                title={"Thành tiền (tháng)"}
                value={`${dataTable.thanh_tien_thang ? formatMoney(dataTable.thanh_tien_thang) : ''} VND`}
            />
            <RowExplainReview explain={dataTable.dien_giai ? dataTable.dien_giai : ''} />
        </TableReview>
    </Animatable.View>
        : null
}
