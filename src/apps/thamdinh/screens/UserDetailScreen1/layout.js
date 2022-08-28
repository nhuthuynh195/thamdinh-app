import React from "react";
import {
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from "react-native";
import _ from "ramda";
import FastImage from "react-native-fast-image";

import { DropownItemReview } from "./widget";
import { TableBusiness, TablePersonal } from "./widget/TableInfoReview";
import { PopupConfirmReivew } from "./widget/PopupConfirmReivew";
import styles from "./style";
import IMAGE from "@core/resources/icon";
import {
  scaleSzie,
  isIphoneX,
  iconsFloatButtonProperty,
  iconsTab,
  getValueOfObject,
  getKeyOfObject,
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
import TabReference from "../UserDetailScreen/widget/TabReference";
import TabRequestLoan from "../UserDetailScreen/widget/TabRequestLoan";
// import TabRequestLoan from './widget/TabRequestLoan';

import TabFinance from "./widget/TabFinance";
// import TabDocument from './widget/TabDocument';
import TabDocument from "../UserDetailScreen/widget/TabDocument";
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

const { width } = Dimensions.get("window");

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
    const addressClient = getValueOfObject(clientDetail.dia_chi_hien_tai);
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
              ? "Chưa có địa chỉ"
              : `${address1.dia_chi}, ${address1.phuong_xa_readable}, ${address1.quan_huyen_readable}, ${address1.tinh_tp_readable}`}
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

  renderContainerProfile() {
    const { heightMoreProfile } = this.state;
    const { clientDetail } = this.props;
    const iconDrop =
      heightMoreProfile === 0 ? IMAGE.dropdownCircle : IMAGE.dropupCircle;
    const addressClient = getValueOfObject(clientDetail.dia_chi_hien_tai);
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
              {`24/19 Thủ Khoa Huân, P. Bến Thành, Q1, TP. Hồ Chí Minh`}
            </Text>
          </View>
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
            title="Huỷ"
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
            title="Lưu"
            backgroundButton={styleConfigs.PURPLE_COLOR}
            styleButton={{ flex: 1 }}
            titleColor={"#ffffff"}
            onPress={this.showPopupConfirm}
          />
        </View>
      </View>
    );
  }

  renderTabs() {
    const { status, indexStatusSelect } = this.state;
    const temptStatus =
      status[indexStatusSelect] !== ""
        ? status[indexStatusSelect]
        : "Trạng thái";
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

  renderFooterTabReview() {
    const { day, month } = this.calculatorIntoMoneyDay();
    return (
      <View style={[styles.containerFooterTabReview, commonStyles.shadowApp]}>
        <Text style={[styles.textFooterReview, { marginBottom: scaleSzie(6) }]}>
          {`Nguồn tiền trả nợ`}
        </Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View>
            <Text style={styles.textFooterReview}>{`Hàng ngày`}</Text>
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
            <Text style={styles.textFooterReview}>{`Hàng tháng`}</Text>
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
            title="Thu nhập từ KD hiện tại/ KD khác"
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
              {`+ Thêm kinh doanh`}
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
          title="Thu nhập từ KD hiện tại/ KD khác"
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
                  {`+ Thêm kinh doanh`}
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
            title="Giá vốn hàng bán"
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
              {`+ Thêm kinh doanh`}
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
          title="Giá vốn hàng bán"
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
                  {`+ Thêm kinh doanh`}
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
          title="Chi phí thuộc về KD"
          onPressDropdown={this.toggleTableBusinessExpenses}
        />
        <TablePersonal
          visible={isShowTableBusinessExpenses}
          nameTable="Thuê nhà/ ĐĐKD"
          dataTable={chi_phi_kd_thue_nha}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_kd_thue_nha`,
              "Thuê nhà/ ĐĐKD",
              "Chi phí thuộc về KD"
            )
          }
        />
        <TablePersonal
          visible={isShowTableBusinessExpenses}
          nameTable="Điện, nước nhà/ ĐĐKD"
          dataTable={chi_phi_kd_dien_nuoc}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_kd_dien_nuoc`,
              "Điện, nước nhà/ ĐĐKD",
              "Chi phí thuộc về KD"
            )
          }
        />
        <TablePersonal
          visible={isShowTableBusinessExpenses}
          nameTable="Thuê nhân viên"
          dataTable={chi_phi_kd_thue_nv}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_kd_thue_nv`,
              "Thuê nhân viên",
              "Chi phí thuộc về KD"
            )
          }
        />
        <TablePersonal
          visible={isShowTableBusinessExpenses}
          nameTable="Vận hành KD"
          dataTable={chi_phi_kd_van_hanh}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_kd_van_hanh`,
              "Vận hành KD",
              "Chi phí thuộc về KD"
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
          title="Chi phí thuộc về gia đình"
          onPressDropdown={this.toggleTableFamilyExpenses}
        />
        <TablePersonal
          visible={isShowTableFamilyExpenses}
          nameTable="Ăn uống"
          dataTable={chi_phi_gia_dinh_an_uong}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_gia_dinh_an_uong`,
              "Ăn uống",
              "Chi phí thuộc về gia đình"
            )
          }
        />
        <TablePersonal
          visible={isShowTableFamilyExpenses}
          nameTable="Xăng, điện thoại, internet"
          dataTable={chi_phi_gia_dinh_xang_dt_internet}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_gia_dinh_xang_dt_internet`,
              "Xăng, điện thoại, internet",
              "Chi phí thuộc về gia đình"
            )
          }
        />
        <TablePersonal
          visible={isShowTableFamilyExpenses}
          nameTable="Học phí cho con"
          dataTable={chi_phi_gia_dinh_hoc_phi_cho_con}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_gia_dinh_hoc_phi_cho_con`,
              "Học phí cho con",
              "Chi phí thuộc về gia đình"
            )
          }
        />
        <TablePersonal
          visible={isShowTableFamilyExpenses}
          nameTable="Chi phí khác"
          dataTable={chi_phi_gia_dinh_chi_phi_khac}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_gia_dinh_chi_phi_khac`,
              "Chi phí khác",
              "Chi phí thuộc về gia đình"
            )
          }
        />
        <TablePersonal
          visible={isShowTableFamilyExpenses}
          nameTable="Chi phí dự phòng"
          dataTable={chi_phi_gia_dinh_chi_phi_du_phong}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_gia_dinh_chi_phi_du_phong`,
              "Chi phí dự phòng",
              "Chi phí thuộc về gia đình"
            )
          }
        />
        <TablePersonal
          visible={isShowTableFamilyExpenses}
          nameTable="Trợ cấp"
          dataTable={chi_phi_gia_dinh_tro_cap}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_gia_dinh_tro_cap`,
              "Trợ cấp",
              "Chi phí thuộc về gia đình"
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
          title="Chi phí"
          onPressDropdown={this.toggleTableExpenses}
        />
        <TablePersonal
          visible={isShowTableExpenses}
          nameTable="Vay ngoài"
          dataTable={chi_phi_vay_ngoai}
          editInfoReview={(dataEdit) =>
            this.editRemainingInfo(
              dataEdit,
              `chi_phi_vay_ngoai`,
              "Vay ngoài",
              "Chi phí"
            )
          }
        />
      </View>
    );
  }

  renderTabReview() {
    return (
      <View tabLabel={"Bảng đánh giá"} style={styles.containerTabView}>
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
        onBackButtonPress={() => this.setState({ visibleModalTabbar: false })}
        visibleModalTakePhoto={this.state.visibleModalTakePhoto}
        visibleModalUpload={this.state.visibleModalUpload}
        onRequestCloseModalTakePhoto={() =>
          this.setState({ visibleModalTakePhoto: false })
        }
        onRequestCloseModalUpload={() =>
          this.setState({ visibleModalUpload: false })
        }
        takePhotoComponent={() => (
          <CameraScreen
            onRequestCloseModalTakePhoto={() =>
              this.setState({ visibleModalTakePhoto: false })
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
            title="Mã Kinh Doanh"
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
            tabLabel={"Thông tin"}
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
            tabLabel={"Tham chiếu"}
            changeSwipeDirection={(swipeDirection) =>
              this.setState({ swipeDirection })
            }
          />
          <TabRequestLoan
            tabLabel={"Yêu cầu vay"}
            isProperty={true}
            changeSwipeDirection={(swipeDirection) =>
              this.setState({ swipeDirection })
            }
          />
          <TabFinance
            tabLabel={"Tài chính"}
            changeSwipeDirection={(swipeDirection) =>
              this.setState({ swipeDirection })
            }
          />

          <TabDocument
            tabLabel={"Tài liệu"}
            gotoCamera={() => this.setState({ visibleModalTakePhoto: true })}
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
            {`Khách hàng : ${clientDetail.person_id}`}
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
            {`Hợp đồng : ${clientDetail.id}`}
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
            {`Sản phẩm vay : ${clientDetail.contract_product}`}
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
            {`Ngày trễ tối đa : ${clientDetail.previous_contract_highest_late}`}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const { isLoadingGetDetailClient, clientDetail, documentInfo } = this.props;
    const { visibleReviewAvatar } = this.state;
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

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {isLoadingGetDetailClient ? <View /> : this.renderContactIdPersonId()}
        {isLoadingGetDetailClient ? <View /> : this.renderLoanProduct()}
        {isLoadingGetDetailClient ? <PlaceHolderDetail /> : this.renderBody()}
        {isLoadingGetDetailClient ? <View /> : this.renderFloatingButton()}
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
        actions={iconsFloatButtonProperty}
        onPressItem={this.gotoMenuScreen}
      />
    );
  }

  renderTabNeedCollect() {
    const {
      indexSelect_tham_nha_khang_dinh_kh_o_day,
      arr_tham_nha_khang_dinh_kh_o_day,
      arr_tham_nha_tung_bi_doi_no_tai_nha,
      indexSelect_tham_nha_tung_bi_doi_no_tai_nha,
      tham_nha_so_luong_hang_xom_hoi,
      tham_nha_ghi_chu,
      tham_nha_ghi_chu_ve_tinh_1,
      tham_nha_ghi_chu_ve_tinh_2,
      tham_nha_ghi_chu_ve_tinh_3,
      arrRejectReason,
      indexRejectReason,
      status,
      indexStatusSelect,
    } = this.state;
    const { clientDetail } = this.props;
    const { business_evaluation_data } = clientDetail;
    return (
      <View style={styles.containerTabNeedCollect}>
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
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => Keyboard.dismiss()}
            >
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
                  Người thẩm
                </Text>
                <Text style={{ color: "#424242", fontSize: scaleSzie(16) }}>
                  {clientDetail.property_evaluation_data.assigned_staff}
                </Text>
                <View style={{ height: scaleSzie(16) }} />
                <ItemShowDropdown
                  palceHolder="Khẳng định KH ở đây?"
                  isPress={true}
                  value={
                    arr_tham_nha_khang_dinh_kh_o_day[
                      indexSelect_tham_nha_khang_dinh_kh_o_day
                    ]
                  }
                  showDropdown={() => this.showdropdownIsBoss(true)}
                />
                <View style={{ height: scaleSzie(10) }} />
                <ItemShowDropdown
                  palceHolder="Từng bị đòi nợ tại nhà?"
                  isPress={true}
                  value={
                    arr_tham_nha_tung_bi_doi_no_tai_nha[
                      indexSelect_tham_nha_tung_bi_doi_no_tai_nha
                    ]
                  }
                  showDropdown={() => this.showdropdownDues(true)}
                />
                {/* ------- Lý do từ chối ------ */}
                {status[indexStatusSelect] == "Từ chối" ? (
                  <View>
                    <View style={{ height: scaleSzie(10) }} />
                    <ItemShowDropdown
                      palceHolder="Lý do từ chối"
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
                  placeholder={"Số lượng hàng xóm hỏi"}
                  value={tham_nha_so_luong_hang_xom_hoi}
                  onFocus={() => this.tab1Scroll(190)}
                  keyboardType="numeric"
                />

                {/* <ItemEditNote
                                    title={"Số lượng hàng xóm hỏi"}
                                    value={tham_nha_so_luong_hang_xom_hoi}
                                    editNotes={() => this.editNotes("so_luong_hang_xom_hoi", tham_nha_so_luong_hang_xom_hoi, "Số lượng hàng xóm hỏi")}
                                /> */}
                <View style={{ height: scaleSzie(10) }} />
                <ItemEditNote
                  title={"Ghi chú khách hàng"}
                  value={tham_nha_ghi_chu}
                  editNotes={() =>
                    this.editNotes(
                      "ghi_chu_khach_hang",
                      tham_nha_ghi_chu,
                      "Ghi chú khách hàng"
                    )
                  }
                />
                <View style={{ height: scaleSzie(10) }} />

                <ItemEditNote
                  title={"Ghi chú vệ tinh 1"}
                  value={tham_nha_ghi_chu_ve_tinh_1}
                  editNotes={() =>
                    this.editNotes(
                      "ghi_chu_ve_tinh_1",
                      tham_nha_ghi_chu_ve_tinh_1,
                      "Ghi chú vệ tinh 1"
                    )
                  }
                />
                <View style={{ height: scaleSzie(10) }} />
                <ItemEditNote
                  title={"Ghi chú vệ tinh 2"}
                  value={tham_nha_ghi_chu_ve_tinh_2}
                  editNotes={() =>
                    this.editNotes(
                      "ghi_chu_ve_tinh_2",
                      tham_nha_ghi_chu_ve_tinh_2,
                      "Ghi chú vệ tinh 2"
                    )
                  }
                />

                <View style={{ height: scaleSzie(10) }} />
                <ItemEditNote
                  title={"Ghi chú vệ tinh 3"}
                  value={tham_nha_ghi_chu_ve_tinh_3}
                  editNotes={() =>
                    this.editNotes(
                      "ghi_chu_ve_tinh_3",
                      tham_nha_ghi_chu_ve_tinh_3,
                      "Ghi chú vệ tinh 3"
                    )
                  }
                />

                {/* ---------  Get Location -------- */}
                {/* <Text style={{
                                marginTop: scaleSzie(20), fontWeight: "bold", color: styleConfigs.PURPLE_COLOR,
                                fontSize: scaleSzie(14),marginRight:scaleSzie(20)
                            }} >
                                {`Địa chỉ khách hàng    `}
                            
                                <Text onPress={this.updateStoreLocation} style={{paddingLeft:scaleSzie(20),textDecorationLine: 'underline',}} 
                            >
                                   {`( Cập nhật )`}
                                </Text>
                            </Text>
                            <Text style={{
                                marginTop: scaleSzie(5), marginLeft: scaleSzie(10),
                                color: "#868686", fontSize: scaleSzie(14)
                            }} >
                                {`- Kinh độ : ${clientDetail.location && clientDetail.location.longitude ? clientDetail.location.longitude : "Chưa có"}`}
                            </Text>

                            <Text style={{
                                marginTop: scaleSzie(5), marginLeft: scaleSzie(10),
                                color: "#868686", fontSize: scaleSzie(14)
                            }} >
                                {`- Vĩ độ : ${clientDetail.location && clientDetail.location.latitude ? clientDetail.location.latitude : "Chưa có"}`}
                            </Text> */}
              </View>
              <View style={{ height: scaleSzie(200) }} />
            </TouchableOpacity>
          </ScrollView>
          {this.renderFooter()}
        </TouchableOpacity>
      </View>
    );
  }

  renderModalRejectReason() {
    const { rejectReason } = this.state;
    const { clientDetail } = this.props;
    return (
      <ModalAddress
        ref={this.modalRejectReasonRef}
        titleModal={"Lý do từ chối"}
        titleSearch={"Tìm kiếm lý do từ chôí"}
        data={
          clientDetail.property_evaluate_field_options.tham_nha_ly_do_tu_choi
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
      arr_tham_nha_khang_dinh_kh_o_day,
      indexIsBoss,
      visiblePickerIsBoss,
      isShowPopupEditBusiness,
      isShowPopupEditBusinessCapital,
      visiblePopupConfrim,
      visiblePopupConfrimRecorder,
      arr_tham_nha_tung_bi_doi_no_tai_nha,
      indexDues,
      visiblePickerDues,
      indexSelect_tham_nha_khang_dinh_kh_o_day,
      indexSelect_tham_nha_tung_bi_doi_no_tai_nha,
      arrRejectReason,
      indexRejectReason,
      visibleRejectReason,
    } = this.state;
    const { clientDetail } = this.props;
    const temptStatus = status[indexStatusSelect];
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {this.renderContainerProfile()}
          <View
            style={{
              width: width,
              flexDirection: "row",
              marginBottom: scaleSzie(8),
            }}
          >
            <View style={{ flex: 1, paddingLeft: scaleSzie(12) }}>
              <Text
                style={{
                  color: "#6D6D6D",
                  fontWeight: "800",
                  fontSize: scaleSzie(14),
                }}
              >
                Thẩm định nhà
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                paddingRight: scaleSzie(12),
              }}
            >
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
                  <Text
                    bold
                    style={{ color: "#55529E", fontSize: scaleSzie(14) }}
                  >
                    {temptStatus === "" ? "Trạng thái" : temptStatus}
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
            </View>
          </View>
          {this.renderTabNeedCollect()}
        </View>
        {/* <Picker
                    title="Trạng thái"
                    data={status}
                    selectedValue={parseInt(indexStatusSelect)}
                    onValueChange={(index) => this.setState({ indexStatusSelect: index })}
                    onRequestClose={() => this.showDropdownStatus(false)}
                    visible={visiblePickerStatus}
                /> */}
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
          title="Khẳng định KH ở đây?"
          data={arr_tham_nha_khang_dinh_kh_o_day}
          selectedValue={indexSelect_tham_nha_khang_dinh_kh_o_day}
          onValueChange={(index) =>
            this.setState({ indexSelect_tham_nha_khang_dinh_kh_o_day: index })
          }
          onRequestClose={() => this.showdropdownIsBoss(false)}
          visible={visiblePickerIsBoss}
        />
        <Picker
          title="Từng bị đòi nợ tại nhà?"
          data={arr_tham_nha_tung_bi_doi_no_tai_nha}
          selectedValue={indexSelect_tham_nha_tung_bi_doi_no_tai_nha}
          onValueChange={(index) =>
            this.setState({
              indexSelect_tham_nha_tung_bi_doi_no_tai_nha: index,
            })
          }
          onRequestClose={() => this.showdropdownDues(false)}
          visible={visiblePickerDues}
        />
        {/* ---------- Reject Reason ------- */}
        <Picker
          title="Lý do từ chối"
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
        <PopupConfirmReivew
          nameClient={clientDetail.person_name}
          visible={visiblePopupConfrim}
          confirmAssesment={this.confirmAssesment}
          closePopupConfirm={this.closePopupConfirm}
        />
        {this.renderModalTabbar()}
        {this.renderModalRejectReason()}
        {/* <PopupEditReviewBusiness
                    visible={isShowPopupEditBusiness}
                    saveChangeInfoBusiness={this.saveChangeInfoBusiness}
                    closePopupEditInfoBusiness={() => this.setState({ isShowPopupEditBusiness: false })}
                    dataEdit={this.state.dataEditBusiness}
                    titlePopup={this.state.statusTableBusinessInfo.title}
                    titleHeader={"Thu nhập từ KD hiện tại/ KD khác"}
                />

                <PopupEditReviewBusiness
                    visible={isShowPopupEditBusinessCapital}
                    saveChangeInfoBusiness={this.saveChangeInfoBusinessCapital}
                    closePopupEditInfoBusiness={() => this.setState({ isShowPopupEditBusinessCapital: false })}
                    dataEdit={this.state.dataEditBusinessCapital}
                    titlePopup={this.state.statusTableBusinessInfo.title}
                    titleHeader={"Giá vốn hàng bán"}
                />

                <PopupEditReviewRemaining
                    visible={this.state.isShowPopupEditRemainingInfomation}
                    saveChangeInfoBusiness={this.saveRemainingInfo}
                    closePopupEditInfoBusiness={() => this.setState({ isShowPopupEditRemainingInfomation: false })}
                    dataEdit={this.state.dataEditRemainingInfomation}
                    titlePopup={this.state.titlePopupRemaining}
                    titleHeader={this.state.titleHeaderPopupRemaining}
                />

                <PopupConfirmRecorder
                    visible={visiblePopupConfrimRecorder}
                    cancelAudio={this.cancelAudio}
                    submitAudio={this.submitAudio}
                    playAudio={this.playAudio}
                    stopPlayAudio={this.stopPlayAudio}
                /> */}
      </View>
    );
  }
}
