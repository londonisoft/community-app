<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" sm="12">
           <b-overlay :show="loading">
                <b-row>
                    <b-col lg="12" sm="12">
                        <CCard>
                            <CCardHeader>
                                <div class="row">
                                    <div class="col-md-6">
                                        <strong>Main Setting</strong>
                                    </div>
                                </div>
                            </CCardHeader>
                            <CCardBody>
                                <div>
                                    <b-col lg="12" sm="12">
                                        <b-overlay :show="false">
                                            <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
                                                <b-form  @submit.prevent="handleSubmit(register)" @reset.prevent="reset" >
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Refer Bonus (Tk)" vid="refer_bonus" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="formData"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Refer Bonus (Point) <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="refer_bonus"
                                                                    v-model="formData.refer_bonus"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Add Code" vid="add_code" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="formData"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Add Code <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="add_code"
                                                                    v-model="formData.add_code"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Click Break Time" vid="click_break_time" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="formData"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Click Break Time <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="click_break_time"
                                                                    v-model="formData.click_break_time"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Invalid Click For Block" vid="invalid_click_block" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="formData"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Invalid Click For Block <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="invalid_click_block"
                                                                    v-model="formData.invalid_click_block"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-12 text-right">
                                                            <b-button type="submit" variant="primary" style="margin-top:40px" class="mr-2">{{ saveBtnName }}</b-button>
                                                        </div>
                                                    </div>
                                                </b-form>
                                            </ValidationObserver>
                                        </b-overlay>
                                    </b-col>
                                    <b-col lg="12" sm="12">
                                        <b-overlay :show="false">
                                            <ValidationObserver ref="form1"  v-slot="{ handleSubmit, reset }">
                                                <b-form  @submit.prevent="handleSubmit(message)" @reset.prevent="reset" >
                                                    <div class="row">
                                                        <div class="col-md-3">
                                                            <div>
                                                                <p class="m-0 mb-2" style="font-weight: bold"> Maintance Mode </p>
                                                                <b-form-checkbox v-model="messages.maintance_on_off" size="md" name="check-button" switch>
                                                                    <span v-if="messages.maintance_on_off">ON</span>
                                                                    <span v-else>OF</span>
                                                                </b-form-checkbox>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div>
                                                                <p class="m-0 mb-2" style="font-weight: bold">  Task ON OFF  </p>
                                                                <b-form-checkbox v-model="messages.task_on_off" size="md" name="check-button" switch>
                                                                    <span v-if="messages.task_on_off">ON</span>
                                                                    <span v-else>OF</span>
                                                                </b-form-checkbox>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div>
                                                                <p class="m-0 mb-2" style="font-weight: bold">  VPN ON OFF  </p>
                                                                <b-form-checkbox v-model="messages.vpn_on_off" size="md" name="check-button" switch>
                                                                    <span v-if="messages.vpn_on_off">ON</span>
                                                                    <span v-else>OF</span>
                                                                </b-form-checkbox>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div>
                                                                <p class="m-0 mb-2" style="font-weight: bold">  Withdraw ON OFF  </p>
                                                                <b-form-checkbox v-model="messages.withdraw_on_off" size="md" name="check-button" switch>
                                                                    <span v-if="messages.withdraw_on_off">ON</span>
                                                                    <span v-else>OF</span>
                                                                </b-form-checkbox>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Admin Notice" vid="admin_notice" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="messages"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Admin Notice <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-textarea
                                                                    type="text"
                                                                    id="admin_notice"
                                                                    v-model="messages.admin_notice"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-textarea>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="VPN ON/OFF" vid="pakage_message" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="messages"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                VPN ON/OFF <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-textarea
                                                                    type="text"
                                                                    id="pakage_message"
                                                                    v-model="messages.pakage_message"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-textarea>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Country Code" vid="recharge_message" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="messages"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Country Code <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-textarea
                                                                    type="text"
                                                                    id="recharge_message"
                                                                    v-model="messages.recharge_message"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-textarea>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Cash Out Message" vid="cash_out_message" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="messages"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Cash Out Message <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-textarea
                                                                    type="text"
                                                                    id="cash_out_message"
                                                                    v-model="messages.cash_out_message"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-textarea>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Click Point" vid="add_money_message" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="messages"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Click Point <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-textarea
                                                                    type="text"
                                                                    id="add_money_message"
                                                                    v-model="messages.add_money_message"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-textarea>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Interstitial Ads" vid="payment_number_message" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="messages"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Interstitial Ads <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-textarea
                                                                    type="text"
                                                                    id="payment_number_message"
                                                                    v-model="messages.payment_number_message"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-textarea>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Withdraw OFF/ON" vid="add_notice" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="messages"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Withdraw OFF/ON <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-textarea
                                                                    type="text"
                                                                    id="add_notice"
                                                                    v-model="messages.add_notice"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-textarea>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-12 text-right">
                                                            <b-button type="submit" variant="primary" style="margin-top:40px" class="mr-2">{{ saveBtnName }}</b-button>
                                                        </div>
                                                    </div>
                                                </b-form>
                                            </ValidationObserver>
                                        </b-overlay>
                                    </b-col>
                                    <!-- <b-col lg="12" sm="12">
                                        <b-overlay :show="false">
                                            <ValidationObserver ref="form2"  v-slot="{ handleSubmit, reset }">
                                                <b-form  @submit.prevent="handleSubmit(image)" @reset.prevent="reset" >
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image One" vid="image_one" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="images"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image One <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-file
                                                                    type="text"
                                                                    id="image_one"
                                                                    @change="handleimgone"
                                                                    v-model="images.image_one"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-file>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image Two" vid="image_two" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="images"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image Two <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-file
                                                                    type="text"
                                                                    id="image_two"
                                                                    @change="handleimgtwo"
                                                                    v-model="images.image_two"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-file>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image Three" vid="image_three" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="images"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image Three <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-file
                                                                    type="text"
                                                                    id="image_three"
                                                                    @change="handleimgthree"
                                                                    v-model="images.image_three"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-file>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image Four" vid="image_four" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="images"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image Four <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-file
                                                                    type="text"
                                                                    id="image_four"
                                                                    @change="handleimgfour"
                                                                    v-model="images.image_four"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-file>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image Five" vid="image_five" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="images"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image Five <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-file
                                                                    type="text"
                                                                    id="image_five"
                                                                    @change="handleimgfive"
                                                                    v-model="images.image_five"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-file>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image six" vid="image_six" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="images"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image six <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-file
                                                                    type="text"
                                                                    id="image_six"
                                                                    @change="handleimgsix"
                                                                    v-model="images.image_six"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-file>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image seven" vid="image_seven" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="images"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image seven <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-file
                                                                    type="text"
                                                                    id="image_seven"
                                                                    @change="handleimgseven"
                                                                    v-model="images.image_seven"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-file>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image eight" vid="image_eight" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="images"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image eight <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-file
                                                                    type="text"
                                                                    id="image_eight"
                                                                    @change="handleimgeight"
                                                                    v-model="images.image_eight"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-file>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image nine" vid="image_nine" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="images"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image nine <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-file
                                                                    type="text"
                                                                    id="image_nine"
                                                                    @change="handleimgnine"
                                                                    v-model="images.image_nine"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-file>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image ten" vid="image_ten" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="images"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image ten <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-file
                                                                    type="text"
                                                                    id="image_ten"
                                                                    @change="handleimgten"
                                                                    v-model="images.image_ten"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-file>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Refer Image" vid="refer_image" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="images"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Refer Image <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-file
                                                                    type="text"
                                                                    id="refer_image"
                                                                    @change="handleimgrefer"
                                                                    v-model="images.refer_image"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-file>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image one url" vid="image_one_url" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="image_one_url"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image one url <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="image_one_url"
                                                                    v-model="images.image_one_url"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image two url" vid="image_two_url" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="image_two_url"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image two url <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="image_two_url"
                                                                    v-model="images.image_two_url"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image three url" vid="image_three_url" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="image_three_url"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image three url <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="image_three_url"
                                                                    v-model="images.image_three_url"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image four url" vid="image_four_url" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="image_four_url"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image four url <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="image_four_url"
                                                                    v-model="images.image_four_url"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image five url" vid="image_five_url" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="image_five_url"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image five url <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="image_five_url"
                                                                    v-model="images.image_five_url"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image six url" vid="image_six_url" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="image_six_url"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image six url <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="image_six_url"
                                                                    v-model="images.image_six_url"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image seven url" vid="image_seven_url" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="image_seven_url"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image seven url <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="image_seven_url"
                                                                    v-model="images.image_seven_url"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image eight url" vid="image_eight_url" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="image_eight_url"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image eight url <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="image_eight_url"
                                                                    v-model="images.image_eight_url"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image nine url" vid="image_nine_url" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="image_nine_url"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image nine url <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="image_nine_url"
                                                                    v-model="images.image_nine_url"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image ten url" vid="image_ten_url" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="image_ten_url"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image ten url <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="image_ten_url"
                                                                    v-model="images.image_ten_url"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-12 text-right">
                                                            <b-button type="submit" variant="primary" style="margin-top:40px" class="mr-2">{{ saveBtnName }}</b-button>
                                                        </div>
                                                    </div>
                                                </b-form>
                                            </ValidationObserver>
                                        </b-overlay>
                                    </b-col> -->
                                </div>
                            </CCardBody>
                        </CCard>
                    </b-col>
                </b-row>
           </b-overlay>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import RestApi, { baseUrl } from '../../config/api_config'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import iziToast from 'izitoast';

export default {
  props: ['id'],
  components: {
    ValidationObserver,
    ValidationProvider
  },
  created () {
      this.getData()
  },
  data () {
    return {
      saveBtnName: "Update",
      formData: {
        refer_bonus: ''
      },
      messages: {
        add_money_message: ''
      },
      images: {
          image_one: [],
          image_two: [],
          image_three: [],
          image_four: [],
          image_five: [],
          image_six: [],
          image_seven: [],
          image_eight: [],
          image_nine: [],
          image_ten: [],
          refer_image: [],
          image_one_url : '',
          image_two_url : '',
          image_three_url : '',
          image_four_url : '',
          image_five_url : '',
          image_six_url : '',
          image_seven_url : '',
          image_eight_url : '',
          image_nine_url : '',
          image_ten_url : ''
      },
      editId: ''
    }
  },
  computed: {
	loading () {
		return this.$store.state.static.loading
	}
  },
  methods: {
    getData () {
        this.$store.dispatch('mutedLoad', { loading: true})
        RestApi.getData(baseUrl, 'api/setting/show').then(response => {
            if (response.success) {
                this.formData = response.data
            }
            this.$store.dispatch('mutedLoad', { loading: false })
        })
        this.$store.dispatch('mutedLoad', { loading: true})
        RestApi.getData(baseUrl, 'api/message/show').then(response => {
            if (response.success) {
                this.messages = {...response.data,
                    maintance_on_off: response.data.maintance_on_off == '1' ? true : false,
                    task_on_off: response.data.task_on_off == '1' ? true : false,
                    vpn_on_off: response.data.vpn_on_off == '1' ? true : false,
                    withdraw_on_off: response.data.withdraw_on_off == '1' ? true : false,
                }
            }
            this.$store.dispatch('mutedLoad', { loading: false })
        })
        this.$store.dispatch('mutedLoad', { loading: true})
        RestApi.getData(baseUrl, 'api/image/show').then(response => {
            if (response.success) {
                    this.images.image_one_url = response.data.image_one_url
                    this.images.image_two_url = response.data.image_two_url
                    this.images.image_three_url = response.data.image_three_url
                    this.images.image_four_url = response.data.image_four_url
                    this.images.image_five_url = response.data.image_five_url
                    this.images.image_six_url = response.data.image_six_url
                    this.images.image_seven_url = response.data.image_seven_url
                    this.images.image_eight_url = response.data.image_eight_url
                    this.images.image_nine_url = response.data.image_nine_url
                    this.images.image_ten_url = response.data.image_ten_url
            }
            this.$store.dispatch('mutedLoad', { loading: false })
        })
    },
    async register () {
        this.$store.dispatch('mutedLoad', { loading: true })
        let result = null
        result = await RestApi.postData(baseUrl, `api/setting/update`, this.formData)
        this.$store.dispatch('mutedLoad', { loading: false })
        if (result.success) {
			iziToast.success({
				title: 'Success',
				message: result.message
			})
        } else {
            this.$refs.form.setErrors(result.errors)
        }
    },
    async message () {
        this.$store.dispatch('mutedLoad', { loading: true })
        let result = null
        result = await RestApi.postData(baseUrl, `api/message/update`, this.messages)
        this.$store.dispatch('mutedLoad', { loading: false })
        if (result.success) {
			iziToast.success({
				title: 'Success',
				message: result.message
			})
        } else {
            this.$refs.form1.setErrors(result.errors)
        }
    },
    async image () {
        this.$store.dispatch('mutedLoad', { loading: true })
        let result = null
        let formData = new FormData()
        formData.append('image_one', this.formData.image_one)
        formData.append('image_two', this.formData.image_two)
        formData.append('image_three', this.formData.image_three)
        formData.append('image_four', this.formData.image_four)
        formData.append('image_five', this.formData.image_five)
        formData.append('image_six', this.formData.image_six)
        formData.append('image_seven', this.formData.image_seven)
        formData.append('image_eight', this.formData.image_eight)
        formData.append('image_nine', this.formData.image_nine)
        formData.append('image_ten', this.formData.image_ten)
        formData.append('refer_image', this.formData.refer_image)
        formData.append('image_one_url', this.images.image_one_url)
        formData.append('image_two_url', this.images.image_two_url)
        formData.append('image_three_url', this.images.image_three_url)
        formData.append('image_four_url', this.images.image_four_url)
        formData.append('image_five_url', this.images.image_five_url)
        formData.append('image_six_url', this.images.image_six_url)
        formData.append('image_seven_url', this.images.image_seven_url)
        formData.append('image_eight_url', this.images.image_eight_url)
        formData.append('image_nine_url', this.images.image_nine_url)
        formData.append('image_ten_url', this.images.image_ten_url)
        result = await RestApi.postData(baseUrl, `api/image/update`, formData)
        this.$store.dispatch('mutedLoad', { loading: false })
        if (result.success) {
			iziToast.success({
				title: 'Success',
				message: result.message
			})
        } else {
            this.$refs.form1.setErrors(result.errors)
        }
    },
    handleimgone( event ){
        this.formData.image_one = event.target.files[0];
    },
    handleimgtwo( event ){
        this.formData.image_two = event.target.files[0];
    },
    handleimgthree( event ){
        this.formData.image_three = event.target.files[0];
    },
    handleimgfour( event ){
        this.formData.image_four = event.target.files[0];
    },
    handleimgfive( event ){
        this.formData.image_five = event.target.files[0];
    },
    handleimgsix( event ){
        this.formData.image_six = event.target.files[0];
    },
    handleimgseven( event ){
        this.formData.image_seven = event.target.files[0];
    },
    handleimgeight( event ){
        this.formData.image_eight = event.target.files[0];
    },
    handleimgnine( event ){
        this.formData.image_nine = event.target.files[0];
    },
    handleimgten( event ){
        this.formData.image_ten = event.target.files[0];
    },
    handleimgrefer( event ){
        this.formData.refer_image = event.target.files[0];
    }
  }
}
</script>
