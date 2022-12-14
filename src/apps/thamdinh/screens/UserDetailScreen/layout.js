import React from "react";
import {
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import _ from "ramda";
import FastImage from "react-native-fast-image";
import ModalDropdown from "react-native-modal-dropdown";

import { DropownItemReview } from "./widget";
import { TableBusiness, TablePersonal } from "./widget/TableInfoReview";
import PopupEditReviewBusiness from "./widget/PopupEditReview";
import PopupEditReviewRemaining from "./widget/PopupEditReviewRemaining";
import PopupConfirmRecorder from "./widget/PopupConfirmRecorder";
import { PopupConfirmReivew } from "./widget/PopupConfirmReivew";
import styles from "./style";
import IMAGE from "@core/resources/icon";
import {
  scaleSzie,
  isIphoneX,
  iconsFloatButton,
  iconsTab,
  getValueOfObject,
  getKeyOfObject,
  formatMoney,
} from "@core/utils/func";
import {
  HeaderScreen,
  Text,
  ButtonSubmit,
  Tabs,
  AutoGrowingTextInput,
  ItemShowDropdown,
  Picker,
  FloatingButton,
  PopupPhone,
  Button,
  ModalContent,
  BottomTab,
  PlaceHolderDetail,
  Loading,
} from "@core/components";
import Configs from "@core/configs";
import styleConfigs from "@configs/style";
import commonStyles from "@core/commonStyles";
import TabBusinessInfo from "./widget/TabBusinessInfo";
import TabReference from "./widget/TabReference";
import TabRequestLoan from "./widget/TabRequestLoan";
import TabFinance from "./widget/TabFinance";
import TabDocument from "./widget/TabDocument";
import CameraScreen from "../CameraScreen";
import PhotoScreen from "../PhotoScreen";
import {
  Dropdown,
  ReviewAvatar,
  ModalAddress,
  EditNoteModal,
  ItemEditNote,
} from "../../components";
import ReviewPhotoScreen from "../ReviewPhotoScreen";

export default class Layout extends React.Component {
  renderAvatarUser(url) {
    return (
      <View
        style={{
          width: scaleSzie(70),
          height: scaleSzie(70),
          borderRadius: scaleSzie(35),
          overflow: "hidden",
        }}
      >
        <FastImage
          source={{ uri: url, priority: FastImage.priority.low }}
          style={{ width: scaleSzie(70), height: scaleSzie(70) }}
        />
      </View>
    );
  }

  renderProfile() {
    const { clientDetail, documentInfo } = this.props;
    const { avatar } = this.state;
    const addressClient = getValueOfObject(
      clientDetail.business_info.dia_chi_kd
    );
    const isEmptyAddress1 = _.isEmpty(addressClient[0]);
    const address1 = addressClient[0];

    const chan_dung_khach_hang =
      !_.isEmpty(documentInfo) &&
      documentInfo.xac_minh_khach_hang &&
      documentInfo.xac_minh_khach_hang.chan_dung_kh &&
      documentInfo.xac_minh_khach_hang.chan_dung_kh.length > 0
        ? documentInfo.xac_minh_khach_hang.chan_dung_kh[0].url
        : false;

    return (
      <View style={[styles.containerProfile]}>
        <View style={styles.containerAvatar}>
          <View style={{ width: scaleSzie(72), height: scaleSzie(72) }}>
            <Button onPress={this.reviewAvatar}>
              {avatar !== "" ? (
                this.renderAvatarUser(avatar)
              ) : clientDetail.avatar_url !== null ? (
                this.renderAvatarUser(clientDetail.avatar_url)
              ) : chan_dung_khach_hang ? (
                this.renderAvatarUser(chan_dung_khach_hang)
              ) : (
                <Image
                  source={IMAGE.famaleAvatar}
                  style={{ width: scaleSzie(70), height: scaleSzie(70) }}
                />
              )}
            </Button>
            <Button
              onPress={this.changeAvatar}
              style={{ position: "absolute", bottom: 0, right: 0 }}
            >
              <Image
                source={IMAGE.camera}
                style={{
                  width: scaleSzie(24),
                  height: scaleSzie(24),
                }}
              />
            </Button>
          </View>
        </View>
        <View style={styles.containerUserInfo}>
          <Text
            bold
            style={{ color: "#424242", fontSize: scaleSzie(16) }}
            numberOfLines={2}
          >
            {isEmptyAddress1
              ? "Ch??a c?? ?????a ch???"
              : `${address1.so_nha}, ${address1.phuong_xa_readable}, ${address1.quan_huyen_readable}, ${address1.tinh_tp_readable}`}
          </Text>
          <Text
            style={{
              color: "#424242",
              fontSize: scaleSzie(16),
              marginTop: scaleSzie(3),
            }}
            numberOfLines={1}
          >
            {clientDetail.person_business}
          </Text>
        </View>

        <View style={styles.containerIconPhone}>
          {clientDetail.callable ? (
            <Button
              onPress={this.showPopupCall}
              style={{
                paddingHorizontal: scaleSzie(14),
                paddingVertical: scaleSzie(17),
              }}
            >
              <Image
                source={IMAGE.phone}
                style={{
                  width: scaleSzie(22),
                  height: scaleSzie(22),
                }}
              />
            </Button>
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }

  renderBusinessAddress_2() {
    const { heightMoreProfile } = this.state;
    const { clientDetail } = this.props;
    const { business_info } = clientDetail;
    const { dia_chi_kd } = business_info;
    const address = getValueOfObject(_.pick(["dia_chi_kd_2"], dia_chi_kd));
    if (_.isEmpty(address[0])) {
      return <View />;
    }
    return (
      <View
        style={{
          width: Configs.FULL_WIDTH,
          height: heightMoreProfile,
          borderBottomColor: "#C8C8C8",
          borderBottomWidth: scaleSzie(0.5),
          paddingLeft: scaleSzie(94),
          paddingRight: scaleSzie(64),
          backgroundColor: "#ffffff",
        }}
      >
        <Text bold style={{ color: "#424242", fontSize: scaleSzie(16) }}>
          {this.getAddressString(address[0])}
        </Text>
      </View>
    );
  }

  renderContainerProfile() {
    const { heightMoreProfile } = this.state;
    const { clientDetail } = this.props;
    const { business_info } = clientDetail;
    const { dia_chi_kd } = business_info;
    const iconDrop =
      heightMoreProfile === 0 ? IMAGE.dropdownCircle : IMAGE.dropupCircle;
    const addressClient = getValueOfObject(dia_chi_kd);
    const dia_chi_kd_2 = _.pick("dia_chi_kd_2", dia_chi_kd);
    return (
      <View
        style={{
          width: Configs.FULL_WIDTH,
          height: scaleSzie(132 + heightMoreProfile),
        }}
      >
        {this.renderProfile()}
        {heightMoreProfile === 0 ? (
          <View
            style={{
              height: scaleSzie(1),
              width: Configs.FULL_WIDTH,
              borderBottomColor: "#C8C8C8",
              borderBottomWidth: scaleSzie(0.5),
            }}
          />
        ) : (
          this.renderBusinessAddress_2()
        )}

        {this.checkEmptyFiled(addressClient) ? (
          <View />
        ) : (
          <Button
            onPress={this.showMoreProfile}
            style={{
              position: "absolute",
              bottom: scaleSzie(1),
              right: scaleSzie(18),
              paddingHorizontal: scaleSzie(3),
            }}
          >
            <Image
              source={iconDrop}
              style={{ width: scaleSzie(40), height: scaleSzie(40) }}
            />
          </Button>
        )}
      </View>
    );
  }

  renderTabs() {
    const { status, indexStatusSelect } = this.state;
    const temptStatus =
      status[indexStatusSelect] !== ""
        ? status[indexStatusSelect]
        : "Tr???ng th??i";
    return (
      <Tabs
        tabWidth={110}
        itemRight={
          <Button
            onPress={() => this.showDropdownStatus(true)}
            style={styles.dropdownStatus}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                paddingBottom: scaleSzie(2),
              }}
            >
              <Text bold style={{ color: "#55529E", fontSize: scaleSzie(14) }}>
                {temptStatus}
              </Text>
            </View>
            <View
              style={{
                paddingRight: scaleSzie(8),
                justifyContent: "flex-end",
                paddingBottom: scaleSzie(8),
              }}
            >
              <Image
                source={IMAGE.dropdownBrown}
                style={{ width: scaleSzie(13), height: scaleSzie(7) }}
              />
            </View>
          </Button>
        }
      >
        {this.renderTabNeedCollect()}
        {this.renderTabReview()}
      </Tabs>
    );
  }

  renderTabNeedCollect() {
    const {
      notes,
      arrIsBoss,
      indexIsBoss,
      arrDues,
      indexDues,
      arrRejectReason,
      indexRejectReason,
      status,
      indexStatusSelect,
      note_numberPeoplesRequest,
      note_client,
      note_satellite_1,
      note_satellite_2,
      note_satellite_3,
    } = this.state;
    const { clientDetail } = this.props;
    const { business_evaluation_data } = clientDetail;

    const temptNumberPeoplesRequest = business_evaluation_data.tham_kd_tai_so_luong_nguoi_hoi
      ? business_evaluation_data.tham_kd_tai_so_luong_nguoi_hoi
      : "";
    // const temptNote = business_evaluation_data.tham_kd_tai_ghi_chu ? business_evaluation_data.tham_kd_tai_ghi_chu : '';
    // const temptSatellite1 = business_evaluation_data.tham_kd_tai_cho_ghi_chu_ve_tinh_1 ? business_evaluation_data.tham_kd_tai_cho_ghi_chu_ve_tinh_1 : '';
    // const temptSatellite2 = business_evaluation_data.tham_kd_tai_cho_ghi_chu_ve_tinh_2 ? business_evaluation_data.tham_kd_tai_cho_ghi_chu_ve_tinh_2 : '';
    // const temptSatellite3 = business_evaluation_data.tham_kd_tai_cho_ghi_chu_ve_tinh_3 ? business_evaluation_data.tham_kd_tai_cho_ghi_chu_ve_tinh_3 : '';

    return (
      <View
        key="Th???m_KD"
        tabLabel={"Th???m KD"}
        style={styles.containerTabNeedCollect}
      >
        <TouchableOpacity
          onPress={() => Keyboard.dismiss()}
          activeOpacity={1}
          style={[{ flex: 1 }, commonStyles.shadowApp]}
        >
          <ScrollView
            ref={this.scrollTab1Ref}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity activeOpacity={1}>
              <View style={{ height: 3 }} />
              <View
                style={[
                  {
                    paddingHorizontal: scaleSzie(16),
                    paddingBottom: scaleSzie(44),
                    paddingTop: scaleSzie(10),
                    backgroundColor: "#ffffff",
                    borderRadius: scaleSzie(4),
                  },
                  commonStyles.shadowApp,
                ]}
              >
                <Text
                  bold
                  style={{
                    color: "#A2A2A2",
                    fontSize: scaleSzie(14),
                    marginBottom: scaleSzie(2),
                  }}
                >
                  Ng?????i th???m
                </Text>
                <Text style={{ color: "#424242", fontSize: scaleSzie(16) }}>
                  {clientDetail.business_evaluation_data.assigned_staff}
                </Text>
                <View style={{ height: scaleSzie(16) }} />
                <ItemShowDropdown
                  palceHolder="KH l?? ch??? KD"
                  value={arrIsBoss[indexIsBoss]}
                  isPress={true}
                  showDropdown={() => this.showdropdownIsBoss(true)}
                />
                <View style={{ height: scaleSzie(10) }} />
                <ItemShowDropdown
                  palceHolder="T???ng b??? ????i n??? t???i ch????"
                  value={arrDues[indexDues]}
                  isPress={true}
                  showDropdown={() => this.showdropdownDues(true)}
                />
                {/* ------- L?? do t??? ch???i ------ */}
                {status[indexStatusSelect] == "T??? ch???i" ? (
                  <View>
                    <View style={{ height: scaleSzie(10) }} />
                    <ItemShowDropdown
                      palceHolder="L?? do t??? ch???i"
                      value={this.state.rejectReason.title}
                      isPress={true}
                      // showDropdown={() => this.showDrodownRejectReason(true)}
                      showDropdown={this.showModalRejectReason}
                    />
                  </View>
                ) : (
                  <View />
                )}

                <View style={{ height: scaleSzie(16) }} />
                <AutoGrowingTextInput
                  ref={this.so_luong_nguoi_hoi_Ref}
                  placeholder={"S??? l?????ng ng?????i h???i"}
                  value={temptNumberPeoplesRequest}
                  onFocus={() => this.tab1Scroll(190)}
                  keyboardType="numeric"
                />

                {/* <ItemEditNote
                                    title={"S??? l?????ng ng?????i h???i"}
                                    value={note_numberPeoplesRequest}
                                    editNotes={() => this.editNotes("so_luong_nguoi_hoi", note_numberPeoplesRequest, "S??? l?????ng ng?????i h???i")}
                                /> */}

                <View style={{ height: scaleSzie(10) }} />
                <ItemEditNote
                  title={"Ghi ch?? kh??ch h??ng"}
                  value={note_client}
                  editNotes={() =>
                    this.editNotes(
                      "ghi_chu_khach_hang",
                      note_client,
                      "Ghi ch?? kh??ch h??ng"
                    )
                  }
                />
                <ItemEditNote
                  title={"Ghi ch?? v??? tinh 1"}
                  value={note_satellite_1}
                  editNotes={() =>
                    this.editNotes(
                      "ghi_chu_ve_tinh_1",
                      note_satellite_1,
                      "Ghi ch?? v??? tinh 1"
                    )
                  }
                />
                <View style={{ height: scaleSzie(10) }} />
                <ItemEditNote
                  title={"Ghi ch?? v??? tinh 2"}
                  value={note_satellite_2}
                  editNotes={() =>
                    this.editNotes(
                      "ghi_chu_ve_tinh_2",
                      note_satellite_2,
                      "Ghi ch?? v??? tinh 2"
                    )
                  }
                />
                <View style={{ height: scaleSzie(10) }} />
                <ItemEditNote
                  title={"Ghi ch?? v??? tinh 3"}
                  value={note_satellite_3}
                  editNotes={() =>
                    this.editNotes(
                      "ghi_chu_ve_tinh_3",
                      note_satellite_3,
                      "Ghi ch?? v??? tinh 3"
                    )
                  }
                />
                {/* ---------  Get Location -------- */}

                <Text
                  style={{
                    marginTop: scaleSzie(20),
                    fontWeight: "bold",
                    color: styleConfigs.PURPLE_COLOR,
                    fontSize: scaleSzie(12),
                    marginRight: scaleSzie(20),
                  }}
                >
                  {`?????a ch??? kh??ch h??ng    `}

                  <Text
                    onPress={this.updateStoreLocation}
                    style={{
                      paddingLeft: scaleSzie(20),
                      textDecorationLine: "underline",
                      color: "red",
                    }}
                  >
                    {`( C???p nh???t )`}
                  </Text>
                </Text>
                <Text
                  style={{
                    marginTop: scaleSzie(5),
                    marginLeft: scaleSzie(10),
                    color: "#868686",
                    fontSize: scaleSzie(14),
                  }}
                >
                  {`- Kinh ????? : ${
                    clientDetail.location && clientDetail.location.longitude
                      ? clientDetail.location.longitude
                      : "Ch??a c??"
                  }`}
                </Text>

                <Text
                  style={{
                    marginTop: scaleSzie(5),
                    marginLeft: scaleSzie(10),
                    color: "#868686",
                    fontSize: scaleSzie(14),
                  }}
                >
                  {`- V?? ????? : ${
                    clientDetail.location && clientDetail.location.latitude
                      ? clientDetail.location.latitude
                      : "Ch??a c??"
                  }`}
                </Text>
              </View>

              <View style={{ height: scaleSzie(200) }} />
            </TouchableOpacity>
          </ScrollView>
          {this.renderFooter()}
        </TouchableOpacity>
      </View>
    );
  }

  renderFooter() {
    const { keyboardHeight } = this.state;
    const heightIphoneX = isIphoneX() ? scaleSzie(62) : scaleSzie(52);
    if (Platform.OS === "android" && keyboardHeight > 0) {
      return null;
    }
    return (
      <View style={[styles.containerFooter, { height: heightIphoneX }]}>
        <View style={{ flex: 1, paddingRight: scaleSzie(6), height: 40 }}>
          <ButtonSubmit
            title="Hu???"
            backgroundButton="#ffffff"
            styleButton={{ flex: 1 }}
            borderButtonColor={styleConfigs.PURPLE_COLOR}
            titleColor={styleConfigs.PURPLE_COLOR}
            onPress={this.cancelEditBusinessAll}
            activeOpacity={1}
          />
        </View>

        <View style={{ flex: 1, paddingLeft: scaleSzie(6), height: 40 }}>
          <ButtonSubmit
            title="L??u"
            styleButton={{ flex: 1 }}
            backgroundButton={styleConfigs.PURPLE_COLOR}
            titleColor={"#ffffff"}
            onPress={this.showPopupConfirm}
          />
        </View>
      </View>
    );
  }

  renderFooterTabReview() {
    const { day, month } = this.calculatorIntoMoneyDay();
    return (
      <View style={[styles.containerFooterTabReview, commonStyles.shadowApp]}>
        <Text style={[styles.textFooterReview, { marginBottom: scaleSzie(6) }]}>
          {`Ngu???n ti???n tr??? n???`}
        </Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View>
            <Text style={styles.textFooterReview}>{`H??ng ng??y`}</Text>
            <Text
              bold
              style={[styles.textFooterReview, { fontSize: scaleSzie(16) }]}
            >
              {day}
            </Text>
          </View>
          <View
            style={{
              width: 0.5,
              paddingBottom: scaleSzie(26),
              paddingTop: scaleSzie(10),
              marginHorizontal: scaleSzie(18),
            }}
          >
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }} />
          </View>
          <View>
            <Text style={styles.textFooterReview}>{`H??ng th??ng`}</Text>
            <Text
              bold
              style={[styles.textFooterReview, { fontSize: scaleSzie(16) }]}
            >
              {month}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderTableCurrentBusinessIncome() {
    const { isShowTableCurrentBusinessIncome, thu_nhap_kd } = this.state;
    let flagRenderTable = 0;
    if (_.isEmpty(thu_nhap_kd)) {
      return (
        <View>
          <DropownItemReview
            visible={true}
            title="Thu nh???p t??? KD hi???n t???i/ KD kh??c"
            onPressDropdown={this.toggleTableCurrentBusinessIncome}
          />
          <Button onPress={() => this.createTableBusinessInfo("thu_nhap_kd_1")}>
            <Text
              bold
              style={{
                color: styleConfigs.PURPLE_COLOR,
                fontSize: scaleSzie(16),
                marginTop: scaleSzie(10),
                marginBottom: scaleSzie(35),
                marginLeft: scaleSzie(12),
              }}
            >
              {`+ Th??m kinh doanh`}
            </Text>
          </Button>
        </View>
      );
    }
    const arrayBusinessTable = getKeyOfObject(thu_nhap_kd);
    return (
      <View>
        <DropownItemReview
          visible={isShowTableCurrentBusinessIncome}
          title="Thu nh???p t??? KD hi???n t???i/ KD kh??c"
          onPressDropdown={this.toggleTableCurrentBusinessIncome}
        />
        {arrayBusinessTable.map((keyTable, index) => {
          if (!_.isEmpty(thu_nhap_kd[keyTable])) {
            return (
              <TableBusiness
                key={index}
                visible={isShowTableCurrentBusinessIncome}
                nameTable={this.getTitleTableBusinessInfo(keyTable)}
                showpopupEditInfoBusiness={() =>
                  this.updateTableBusiness(thu_nhap_kd[keyTable], keyTable)
                }
                dataTable={thu_nhap_kd[keyTable]}
              />
            );
          }
          return <View />;
        })}
        {arrayBusinessTable.map((keyTable, index) => {
          if (_.isEmpty(thu_nhap_kd[keyTable]) && flagRenderTable === 0) {
            flagRenderTable = 1;
            return (
              <Button
                key={index}
                onPress={() => {
                  this.createTableBusinessInfo(keyTable);
                }}
              >
                <Text
                  bold
                  style={{
                    color: styleConfigs.PURPLE_COLOR,
                    fontSize: scaleSzie(16),
                    marginTop: scaleSzie(10),
                    marginBottom: scaleSzie(35),
                    marginLeft: scaleSzie(12),
                  }}
                >
                  {`+ Th??m kinh doanh`}
                </Text>
              </Button>
            );
          }
          return <View />;
        })}
      </View>
    );
  }

  renderTableCostOfGoodsSold() {
    const { isShowTableCostOfGoodsSold, gia_von_kd } = this.state;
    let flagRenderTable = 0;
    if (_.isEmpty(gia_von_kd)) {
      return (
        <View>
          <DropownItemReview
            visible={true}
            title="Gi?? v???n h??ng b??n"
            onPressDropdown={this.toggleTableCostOfGoodsSold}
          />
          <Button
            onPress={() => this.createTableBusinessCapitalInfo("gia_von_kd_1")}
          >
            <Text
              bold
              style={{
                color: styleConfigs.PURPLE_COLOR,
                fontSize: scaleSzie(16),
                marginTop: scaleSzie(10),
                marginBottom: scaleSzie(35),
                marginLeft: scaleSzie(12),
              }}
            >
              {`+ Th??m kinh doanh`}
            </Text>
          </Button>
        </View>
      );
    }
    const arrayBusinessCapitalTable = getKeyOfObject(gia_von_kd);
    return (
      <View>
        <DropownItemReview
          visible={isShowTableCostOfGoodsSold}
          title="Gi?? v???n h??ng b??n"
          onPressDropdown={this.toggleTableCostOfGoodsSold}
        />
        {arrayBusinessCapitalTable.map((keyTable, index) => {
          if (!_.isEmpty(gia_von_kd[keyTable])) {
            return (
              <TableBusiness
                key={index}
                visible={isShowTableCostOfGoodsSold}
                nameTable={this.getTitleTableBusinessInfo(keyTable)}
                showpopupEditInfoBusiness={() =>
                  this.updateTableBusinessCapital(
                    gia_von_kd[keyTable],
                    keyTable
                  )
                }
                dataTable={gia_von_kd[keyTable]}
              />
            );
          }
          return <View />;
        })}
        {arrayBusinessCapitalTable.map((keyTable, index) => {
          if (_.isEmpty(gia_von_kd[keyTable]) && flagRenderTable === 0) {
            flagRenderTable = 1;
            return (
              <Button
                key={index}
                onPress={() => {
                  this.createTableBusinessCapitalInfo(keyTable);
                }}
              >
                <Text
                  bold
                  style={{
                    color: styleConfigs.PURPLE_COLOR,
                    fontSize: scaleSzie(16),
                    marginTop: scaleSzie(10),
                    marginBottom: scaleSzie(35),
                    marginLeft: scaleSzie(12),
                  }}
                >
                  {`+ Th??m kinh doanh`}
                </Text>
              </Button>
            );
          }
          return <View />;
        })}
      </View>
    );
  }

  renderTableBusinessExpenses() {
    const {
      isShowTableBusinessExpenses,
      chi_phi_kd_thue_nha,
      chi_phi_kd_dien_nuoc,
      chi_phi_kd_thue_nv,
      chi_phi_kd_van_hanh,
    } = this.state;
    return (
      <View>
        <DropownItemReview
          visible={isShowTableBusinessExpenses}
          title="Chi ph?? thu???c v??? KD"
          onPressDropdown={this.toggleTableBusinessExpenses}
        />
        <TablePersonal
          visible={isShowTableBusinessExpenses}
          nameTable="Thu?? nh??/ ????KD"
          dataTable={chi_phi_kd_thue_nha}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_kd_thue_nha`,
              "Thu?? nh??/ ????KD",
              "Chi ph?? thu???c v??? KD"
            )
          }
        />
        <TablePersonal
          visible={isShowTableBusinessExpenses}
          nameTable="??i???n, n?????c nh??/ ????KD"
          dataTable={chi_phi_kd_dien_nuoc}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_kd_dien_nuoc`,
              "??i???n, n?????c nh??/ ????KD",
              "Chi ph?? thu???c v??? KD"
            )
          }
        />
        <TablePersonal
          visible={isShowTableBusinessExpenses}
          nameTable="Thu?? nh??n vi??n"
          dataTable={chi_phi_kd_thue_nv}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_kd_thue_nv`,
              "Thu?? nh??n vi??n",
              "Chi ph?? thu???c v??? KD"
            )
          }
        />
        <TablePersonal
          visible={isShowTableBusinessExpenses}
          nameTable="V???n h??nh KD"
          dataTable={chi_phi_kd_van_hanh}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_kd_van_hanh`,
              "V???n h??nh KD",
              "Chi ph?? thu???c v??? KD"
            )
          }
        />
      </View>
    );
  }

  renderTableFamilyExpenses() {
    const {
      isShowTableFamilyExpenses,
      chi_phi_gia_dinh_an_uong,
      chi_phi_gia_dinh_xang_dt_internet,
      chi_phi_gia_dinh_hoc_phi_cho_con,
      chi_phi_gia_dinh_chi_phi_khac,
      chi_phi_gia_dinh_chi_phi_du_phong,
      chi_phi_gia_dinh_tro_cap,
    } = this.state;
    return (
      <View>
        <DropownItemReview
          visible={isShowTableFamilyExpenses}
          title="Chi ph?? thu???c v??? gia ????nh"
          onPressDropdown={this.toggleTableFamilyExpenses}
        />
        <TablePersonal
          visible={isShowTableFamilyExpenses}
          nameTable="??n u???ng"
          dataTable={chi_phi_gia_dinh_an_uong}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_gia_dinh_an_uong`,
              "??n u???ng",
              "Chi ph?? thu???c v??? gia ????nh"
            )
          }
        />
        <TablePersonal
          visible={isShowTableFamilyExpenses}
          nameTable="X??ng, ??i???n tho???i, internet"
          dataTable={chi_phi_gia_dinh_xang_dt_internet}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_gia_dinh_xang_dt_internet`,
              "X??ng, ??i???n tho???i, internet",
              "Chi ph?? thu???c v??? gia ????nh"
            )
          }
        />
        <TablePersonal
          visible={isShowTableFamilyExpenses}
          nameTable="H???c ph?? cho con"
          dataTable={chi_phi_gia_dinh_hoc_phi_cho_con}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_gia_dinh_hoc_phi_cho_con`,
              "H???c ph?? cho con",
              "Chi ph?? thu???c v??? gia ????nh"
            )
          }
        />
        <TablePersonal
          visible={isShowTableFamilyExpenses}
          nameTable="Chi ph?? kh??c"
          dataTable={chi_phi_gia_dinh_chi_phi_khac}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_gia_dinh_chi_phi_khac`,
              "Chi ph?? kh??c",
              "Chi ph?? thu???c v??? gia ????nh"
            )
          }
        />
        <TablePersonal
          visible={isShowTableFamilyExpenses}
          nameTable="Chi ph?? d??? ph??ng"
          dataTable={chi_phi_gia_dinh_chi_phi_du_phong}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_gia_dinh_chi_phi_du_phong`,
              "Chi ph?? d??? ph??ng",
              "Chi ph?? thu???c v??? gia ????nh"
            )
          }
        />
        <TablePersonal
          visible={isShowTableFamilyExpenses}
          nameTable="Tr??? c???p"
          dataTable={chi_phi_gia_dinh_tro_cap}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_gia_dinh_tro_cap`,
              "Tr??? c???p",
              "Chi ph?? thu???c v??? gia ????nh"
            )
          }
        />
      </View>
    );
  }

  renderExpenses() {
    const { isShowTableExpenses, chi_phi_vay_ngoai } = this.state;
    return (
      <View>
        <DropownItemReview
          visible={isShowTableExpenses}
          title="Chi ph??"
          onPressDropdown={this.toggleTableExpenses}
        />
        <TablePersonal
          visible={isShowTableExpenses}
          nameTable="Vay ngo??i"
          dataTable={chi_phi_vay_ngoai}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_vay_ngoai`,
              "Vay ngo??i",
              "Chi ph??"
            )
          }
        />
      </View>
    );
  }

  renderTabReview() {
    return (
      <View
        key="B???ng_????nh_gi??"
        tabLabel={"B???ng ????nh gi??"}
        style={styles.containerTabView}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
        >
          {this.renderTableCurrentBusinessIncome()}
          {this.renderTableCostOfGoodsSold()}
          {this.renderTableBusinessExpenses()}
          {this.renderTableFamilyExpenses()}
          {this.renderExpenses()}
          <View style={{ height: scaleSzie(150) }} />
        </ScrollView>
        {this.renderFooterTabReview()}
      </View>
    );
  }

  renderHeader() {
    const clientTitleHeader = this.props.navigation.getParam(
      "clientTitleHeader",
      ""
    );
    const { clientDetail, isLoadingGetDetailClient } = this.props;
    let temptTitle = "";
    if (clientTitleHeader === "" && !isLoadingGetDetailClient) {
      temptTitle = clientDetail.person_name;
    } else {
      temptTitle = clientTitleHeader;
    }
    return (
      <HeaderScreen
        ref={this.recorderRef}
        title={temptTitle}
        leftIcon={IMAGE.back}
        rightIcon={IMAGE.record}
        onPressLeft={this.backHome}
        onPressRight={this.record}
        countRecoder={this.state.countRecoder}
        stopRecorder={this.stopRecord}
        styleLeftIcon={{
          width: scaleSzie(12),
          height: scaleSzie(22),
        }}
        styleRightIcon={{
          width: scaleSzie(16),
          height: scaleSzie(22),
        }}
      />
    );
  }

  renderModalTabbar() {
    return (
      <ModalContent
        swipeDirection={this.state.swipeDirection}
        isVisible={this.state.visibleModalTabbar}
        scrollOffset={this.state.scrollOffset}
        scrollTo={this.handleScrollTo}
        onSwipe={() => this.setState({ visibleModalTabbar: false })}
        deviceHeight={Configs.FULL_HEIGHT}
        deviceWidth={Configs.FULL_WIDTH}
        onBackButtonPress={async () =>
          await this.setState({ visibleModalTabbar: false })
        }
        visibleModalTakePhoto={this.state.visibleModalTakePhoto}
        visibleModalUpload={this.state.visibleModalUpload}
        onRequestCloseModalTakePhoto={async () =>
          await this.setState({ visibleModalTakePhoto: false })
        }
        onRequestCloseModalUpload={() =>
          this.setState({ visibleModalUpload: false })
        }
        takePhotoComponent={() => (
          <CameraScreen
            onRequestCloseModalTakePhoto={async () =>
              await this.setState({ visibleModalTakePhoto: false })
            }
            showModalUploadImage={async (photos) => {
              await this.setState({
                photos,
              });
              await this.setState({
                visibleModalUpload: true,
              });
            }}
          />
        )}
        uploadImageComponent={() => (
          <PhotoScreen
            photos={this.state.photos}
            backCameraModal={() => this.setState({ visibleModalUpload: false })}
          />
        )}
        renderPickerMaKD={() => (
          <Picker
            title="M?? Kinh Doanh"
            data={["1", "2", "3"]}
            selectedValue={0}
            onValueChange={(index) => {}}
            onRequestClose={() => {}}
            visible={true}
          />
        )}
        phi={this.state.phi}
        // ------- Reviwe Photo --------
        reviewPhotoComponent={() => (
          <ReviewPhotoScreen
            ref={this.reviewPhotoRef}
            backToTab={() => this.setState({ visibleModalReviewPhotos: false })}
            photosReview={this.state.photosReview}
          />
        )}
        visibleModalReviewPhotos={this.state.visibleModalReviewPhotos}
        onRequestCloseModalReviewPhotos={() =>
          this.setState({ visibleModalReviewPhotos: false })
        }
      >
        <TouchableOpacity
          style={{
            width: Configs.FULL_WIDTH,
            height: scaleSzie(40),
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPress={() => this.setState({ swipeDirection: "down" })}
          onPressIn={() => this.setState({ swipeDirection: "down" })}
        >
          <View
            style={{
              width: scaleSzie(35),
              height: scaleSzie(3),
              backgroundColor: "#9A9AC5",
            }}
          />
        </TouchableOpacity>
        <BottomTab
          initialPage={this.state.initialPage}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
          tabWidth={Configs.FULL_WIDTH / 5}
          tabHeight={scaleSzie(64)}
          flexIcon={"column"}
          textStyle={{ marginTop: 5 }}
          disableLineCenter
          arrayImage={iconsTab}
        >
          <TabBusinessInfo
            tabLabel={"Th??ng tin"}
            editBusinessInfo={this.editBusinessInfo}
            disableEditBusinessInfo={this.state.disableEditBusinessInfo}
            cancelEditBusinessInfo={() =>
              this.setState({ disableEditBusinessInfo: true })
            }
            saveBusinessInfo={() => this.saveBusinessInfo()}
            showModalAddress={(type) => this.showModalAddress(type)}
            temptEdit={() => this.setState({ phi: true })}
            changeSwipeDirection={(swipeDirection) =>
              this.setState({ swipeDirection })
            }
          />
          <TabReference
            tabLabel={"Tham chi???u"}
            changeSwipeDirection={(swipeDirection) =>
              this.setState({ swipeDirection })
            }
          />

          <TabRequestLoan
            tabLabel={"Y??u c???u vay"}
            changeSwipeDirection={(swipeDirection) =>
              this.setState({ swipeDirection })
            }
          />
          <TabFinance
            tabLabel={"T??i ch??nh"}
            changeSwipeDirection={(swipeDirection) =>
              this.setState({ swipeDirection })
            }
          />
          <TabDocument
            tabLabel={"T??i li???u"}
            gotoCamera={async () =>
              await this.setState({ visibleModalTakePhoto: true })
            }
            navigation={this.props.navigation}
            selectShowImage={this.selectShowImage}
            changeSwipeDirection={(swipeDirection) =>
              this.setState({ swipeDirection })
            }
          />
        </BottomTab>
        {Platform.OS === "ios" ? (
          <Loading visible={this.props.loading} />
        ) : (
          <View />
        )}
      </ModalContent>
    );
  }

  renderContactIdPersonId() {
    const { clientDetail } = this.props;
    return (
      <View
        style={{
          height: scaleSzie(40),
          flexDirection: "row",
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingLeft: scaleSzie(15),
          }}
        >
          <Text
            style={{
              color: "#4F4F4F",
              fontSize: scaleSzie(14),
              fontWeight: "700",
            }}
          >
            {`Kh??ch h??ng : ${clientDetail.person_id}`}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
            paddingRight: scaleSzie(15),
          }}
        >
          <Text
            style={{
              color: "#4F4F4F",
              fontSize: scaleSzie(14),
              fontWeight: "700",
            }}
          >
            {`H???p ?????ng : ${clientDetail.id}`}
          </Text>
        </View>
      </View>
    );
  }

  renderLoanProduct() {
    const { clientDetail } = this.props;
    return (
      <View
        style={{
          height: scaleSzie(40),
          flexDirection: "row",
          backgroundColor: "#fff",
        }}
      >
        <View style={{ flex: 1, paddingLeft: scaleSzie(15) }}>
          <Text style={{ color: "#4F4F4F", fontSize: scaleSzie(14) }}>
            {`S???n ph???m vay : ${clientDetail.contract_product}`}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            paddingRight: scaleSzie(15),
          }}
        >
          <Text style={{ color: "#4F4F4F", fontSize: scaleSzie(14) }}>
            {`Ng??y tr??? t???i ??a : ${clientDetail.previous_contract_highest_late}`}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const { isLoadingGetDetailClient, clientDetail, documentInfo } = this.props;
    const { visibleReviewAvatar, updateAudio } = this.state;
    const chan_dung_khach_hang =
      !_.isEmpty(documentInfo) &&
      documentInfo.xac_minh_khach_hang &&
      documentInfo.xac_minh_khach_hang.chan_dung_kh &&
      documentInfo.xac_minh_khach_hang.chan_dung_kh.length > 0
        ? documentInfo.xac_minh_khach_hang.chan_dung_kh[0].url
        : false;

    const url = clientDetail.avatar_url
      ? clientDetail.avatar_url
      : chan_dung_khach_hang
      ? chan_dung_khach_hang
      : "";

    // const url = clientDetail.avatar_url ? clientDetail.avatar_url : '';
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {/* ---------- Contact Id , PersonId */}
        {isLoadingGetDetailClient ? <View /> : this.renderContactIdPersonId()}
        {isLoadingGetDetailClient ? <View /> : this.renderLoanProduct()}
        {isLoadingGetDetailClient ? <PlaceHolderDetail /> : this.renderBody()}
        {isLoadingGetDetailClient ? <View /> : this.renderFloatingButton()}

        {this.renderModalTabbar()}
        <ReviewAvatar
          visible={visibleReviewAvatar}
          onRequestClose={() => this.setState({ visibleReviewAvatar: false })}
          images={[{ url: url }]}
        />
        <EditNoteModal ref={this.edtiNotesRef} saveNote={this.saveNote} />
      </View>
    );
  }

  renderFloatingButton() {
    const { keyboardHeight } = this.state;
    if (Platform.OS === "android" && keyboardHeight > 0) {
      return <View />;
    }
    return (
      <FloatingButton
        actions={iconsFloatButton}
        onPressItem={this.gotoMenuScreen}
      />
    );
  }

  renderModalRejectReason() {
    const { rejectReason } = this.state;
    const { clientDetail } = this.props;
    return (
      <ModalAddress
        ref={this.modalRejectReasonRef}
        titleModal={"L?? do t??? ch???i"}
        titleSearch={"T??m ki???m l?? do t??? ch????"}
        data={
          clientDetail.business_evaluate_field_options.tham_kd_ly_do_tu_choi
        }
        dataSelected={rejectReason}
        updateAddress={this.updateRejectReason}
      />
    );
  }

  renderBody() {
    const {
      status,
      indexStatusSelect,
      visiblePickerStatus,
      arrIsBoss,
      indexIsBoss,
      visiblePickerIsBoss,
      isShowPopupEditBusiness,
      isShowPopupEditBusinessCapital,
      visiblePopupConfrim,
      visiblePopupConfrimRecorder,
      arrDues,
      indexDues,
      visiblePickerDues,
      arrRejectReason,
      indexRejectReason,
      visibleRejectReason,
    } = this.state;
    const { clientDetail } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {this.renderContainerProfile()}
          {this.renderTabs()}
        </View>
        <Dropdown
          visible={visiblePickerStatus}
          onRequestClose={() => this.showDropdownStatus(false)}
          selectDropDown={(index) =>
            this.setState({
              visiblePickerStatus: false,
              indexStatusSelect: index,
            })
          }
        />
        <Picker
          title="KH l?? ch??? KD"
          data={arrIsBoss}
          selectedValue={indexIsBoss}
          onValueChange={(index) => this.setState({ indexIsBoss: index })}
          onRequestClose={() => this.showdropdownIsBoss(false)}
          visible={visiblePickerIsBoss}
        />
        <Picker
          title="T???ng b??? ????i n??? t???i ch????"
          data={arrDues}
          selectedValue={indexDues}
          onValueChange={(index) => this.setState({ indexDues: index })}
          onRequestClose={() => this.showdropdownDues(false)}
          visible={visiblePickerDues}
        />
        <Picker
          title="L?? do t??? ch???i"
          data={arrRejectReason}
          selectedValue={indexRejectReason}
          onValueChange={(index) => this.setState({ indexRejectReason: index })}
          onRequestClose={() => this.showDrodownRejectReason(false)}
          visible={visibleRejectReason}
        />
        <PopupPhone
          visible={this.state.visiblePopUpPhone}
          callPhone={() => this.callPhone(clientDetail.person_phone)}
          hidePopupCall={this.hidePopupCall}
          phone={clientDetail.person_phone}
        />
        <PopupEditReviewBusiness
          visible={isShowPopupEditBusiness}
          saveChangeInfoBusiness={this.saveChangeInfoBusiness}
          closePopupEditInfoBusiness={() =>
            this.setState({ isShowPopupEditBusiness: false })
          }
          dataEdit={this.state.dataEditBusiness}
          titlePopup={this.state.statusTableBusinessInfo.title}
          titleHeader={"Thu nh???p t??? KD hi???n t???i/ KD kh??c"}
        />

        <PopupEditReviewBusiness
          visible={isShowPopupEditBusinessCapital}
          saveChangeInfoBusiness={this.saveChangeInfoBusinessCapital}
          closePopupEditInfoBusiness={() =>
            this.setState({ isShowPopupEditBusinessCapital: false })
          }
          dataEdit={this.state.dataEditBusinessCapital}
          titlePopup={this.state.statusTableBusinessInfo.title}
          titleHeader={"Gi?? v???n h??ng b??n"}
        />

        <PopupEditReviewRemaining
          visible={this.state.isShowPopupEditRemainingInfomation}
          saveChangeInfoBusiness={this.saveRemainingInfo}
          closePopupEditInfoBusiness={() =>
            this.setState({ isShowPopupEditRemainingInfomation: false })
          }
          dataEdit={this.state.dataEditRemainingInfomation}
          titlePopup={this.state.titlePopupRemaining}
          titleHeader={this.state.titleHeaderPopupRemaining}
        />

        <PopupConfirmReivew
          nameClient={clientDetail.person_name}
          visible={visiblePopupConfrim}
          confirmAssesment={this.confirmAssesment}
          closePopupConfirm={this.closePopupConfirm}
        />
        <PopupConfirmRecorder
          visible={visiblePopupConfrimRecorder}
          cancelAudio={this.cancelAudio}
          submitAudio={this.submitAudio}
          playAudio={this.playAudio}
          stopPlayAudio={this.stopPlayAudio}
        />
        {this.renderModalRejectReason()}
      </View>
    );
  }
}
