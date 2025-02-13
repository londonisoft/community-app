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
                                      <strong>App Update Setting</strong>
                                  </div>
                              </div>
                          </CCardHeader>
                          <CCardBody>
                              <div class='row'>
                                  <b-col lg="12" sm="12">
                                      
                                          <ValidationObserver ref="form1"  v-slot="{ handleSubmit, reset }">
                                              <b-form  @submit.prevent="handleSubmit(register(update))" @reset.prevent="reset" >
                                                 
                                                  <div class='row'>
                                                      <b-col lg="3" sm="3">
                                                          <div>
                                                              <p class="m-0 mb-2" style="font-weight: bold"> Maintance Mode </p>
                                                              <b-form-checkbox v-model="update.maintance" size="md" name="check-button" switch>
                                                                  <span v-if="update.maintance">ON</span>
                                                                  <span v-else>OF</span>
                                                              </b-form-checkbox>
                                                          </div>
                                                      </b-col>
                                                      <b-col lg="3" sm="3">
                                                          <div>
                                                              <p class="m-0 mb-2" style="font-weight: bold">  Task ON OFF  </p>
                                                              <b-form-checkbox v-model="update.task_on_off" size="md" name="check-button" switch>
                                                                  <span v-if="update.task_on_off">ON</span>
                                                                  <span v-else>OF</span>
                                                              </b-form-checkbox>
                                                          </div>
                                                      </b-col>
                                                      <b-col lg="3" sm="3">
                                                          <div>
                                                              <p class="m-0 mb-2" style="font-weight: bold">  Promotion ON OFF  </p>
                                                              <b-form-checkbox v-model="update.promotion_on_off" size="md" name="check-button" switch>
                                                                  <span v-if="update.promotion_on_off">ON</span>
                                                                  <span v-else>OF</span>
                                                              </b-form-checkbox>
                                                          </div>
                                                      </b-col>
                                                      <b-col lg="3" sm="3">
                                                          <div>
                                                              <p class="m-0 mb-2" style="font-weight: bold">  App Cloning Prevent ON OFF  </p>
                                                              <b-form-checkbox v-model="update.app_cloning_prevent" size="md" name="check-button" switch>
                                                                  <span v-if="update.app_cloning_prevent">ON</span>
                                                                  <span v-else>OF</span>
                                                              </b-form-checkbox>
                                                          </div>
                                                      </b-col>
                                                      <b-col lg="3" sm="3">
                                                          <div>
                                                              <p class="m-0 mb-2" style="font-weight: bold">  Emulator Block ON OFF  </p>
                                                              <b-form-checkbox v-model="update.emulator_block" size="md" name="check-button" switch>
                                                                  <span v-if="update.emulator_block">ON</span>
                                                                  <span v-else>OF</span>
                                                              </b-form-checkbox>
                                                          </div>
                                                      </b-col>
                                                      <b-col lg="3" sm="3">
                                                          <div>
                                                              <p class="m-0 mb-2" style="font-weight: bold">  Block Rooted Device ON OFF  </p>
                                                              <b-form-checkbox v-model="update.block_rooted_device" size="md" name="check-button" switch>
                                                                  <span v-if="update.block_rooted_device">ON</span>
                                                                  <span v-else>OF</span>
                                                              </b-form-checkbox>
                                                          </div>
                                                      </b-col>
                                                      <b-col lg="3" sm="3">
                                                          <div>
                                                              <p class="m-0 mb-2" style="font-weight: bold">  Auto Ban Rooted Device ON OFF  </p>
                                                              <b-form-checkbox v-model="update.auto_ban_rooted_device" size="md" name="check-button" switch>
                                                                  <span v-if="update.auto_ban_rooted_device">ON</span>
                                                                  <span v-else>OF</span>
                                                              </b-form-checkbox>
                                                          </div>
                                                      </b-col>
                                                      <b-col lg="3" sm="3">
                                                          <div>
                                                              <p class="m-0 mb-2" style="font-weight: bold">  One Device one Account ON OFF  </p>
                                                              <b-form-checkbox v-model="update.one_device_one_account" size="md" name="check-button" switch>
                                                                  <span v-if="update.one_device_one_account">ON</span>
                                                                  <span v-else>OF</span>
                                                              </b-form-checkbox>
                                                          </div>
                                                      </b-col>
                                                      <b-col lg="3" sm="3">
                                                          <div>
                                                              <p class="m-0 mb-2" style="font-weight: bold">  Termux Block ON OFF  </p>
                                                              <b-form-checkbox v-model="update.termux_block" size="md" name="check-button" switch>
                                                                  <span v-if="update.termux_block">ON</span>
                                                                  <span v-else>OF</span>
                                                              </b-form-checkbox>
                                                          </div>
                                                      </b-col>
                                                      <b-col lg="3" sm="3">
                                                          <div>
                                                              <p class="m-0 mb-2" style="font-weight: bold">  Developer Mode Prevent ON OFF  </p>
                                                              <b-form-checkbox v-model="update.developer_mode_prevent" size="md" name="check-button" switch>
                                                                  <span v-if="update.developer_mode_prevent">ON</span>
                                                                  <span v-else>OF</span>
                                                              </b-form-checkbox>
                                                          </div>
                                                      </b-col>
                                                      <b-col lg="3" sm="3">
                                                          <div>
                                                              <p class="m-0 mb-2" style="font-weight: bold">  Main App ON OFF  </p>
                                                              <b-form-checkbox v-model="update.main_app_on_off" size="md" name="check-button" switch>
                                                                  <span v-if="update.main_app_on_off">ON</span>
                                                                  <span v-else>OF</span>
                                                              </b-form-checkbox>
                                                          </div>
                                                      </b-col>
                                                      <b-col lg="3" sm="3">
                                                          <div>
                                                              <p class="m-0 mb-2" style="font-weight: bold">  Withdraw ON OFF  </p>
                                                              <b-form-checkbox v-model="update.admin_app_on_off" size="md" name="check-button" switch>
                                                                  <span v-if="update.admin_app_on_off">ON</span>
                                                                  <span v-else>OF</span>
                                                              </b-form-checkbox>
                                                          </div>
                                                      </b-col>
                                                      
                                                      <b-col lg="6" sm="6">
                                                          <ValidationProvider name="Max Account Same IP Address" vid="max_account_same_ip" rules="required">
                                                              <b-form-group
                                                              class="row"
                                                              label-cols-sm="12"
                                                              label-for="formData"
                                                              slot-scope="{ valid, errors }"
                                                              >
                                                              <template v-slot:label>
                                                               Max Account Same IP Address
                                                              </template>
                                                              <b-form-input
                                                                  type="text"
                                                                  id="max_account_same_ip"
                                                                  v-model="update.max_account_same_ip"
                                                                  :state="errors[0] ? false : (valid ? true : null)"
                                                                  ></b-form-input>
                                                              <div class="invalid-feedback">
                                                                  {{ errors[0] }}
                                                              </div>
                                                              </b-form-group>
                                                          </ValidationProvider>
                                                      </b-col>


                                                      <b-col lg="6" sm="6">
                                                          <ValidationProvider name="Withdraw Limit" vid="withdraw_limit" rules="required">
                                                              <b-form-group
                                                              class="row"
                                                              label-cols-sm="12"
                                                              label-for="formData"
                                                              slot-scope="{ valid, errors }"
                                                              >
                                                              <template v-slot:label>
                                                               Withdraw Limit
                                                              </template>
                                                              <b-form-input
                                                                  type="text"
                                                                  id="withdraw_limit"
                                                                  v-model="update.withdraw_limit"
                                                                  :state="errors[0] ? false : (valid ? true : null)"
                                                                  ></b-form-input>
                                                              <div class="invalid-feedback">
                                                                  {{ errors[0] }}
                                                              </div>
                                                              </b-form-group>
                                                          </ValidationProvider>
                                                      </b-col>
                                                      <b-col lg="6" sm="6">
                                                          <ValidationProvider name="Package Name" vid="package_name" rules="required">
                                                              <b-form-group
                                                              class="row"
                                                              label-cols-sm="12"
                                                              label-for="formData"
                                                              slot-scope="{ valid, errors }"
                                                              >
                                                              <template v-slot:label>
                                                               Package Name
                                                              </template>
                                                              <b-form-input
                                                                  type="text"
                                                                  id="package_name"
                                                                  v-model="update.package_name"
                                                                  :state="errors[0] ? false : (valid ? true : null)"
                                                                  ></b-form-input>
                                                              <div class="invalid-feedback">
                                                                  {{ errors[0] }}
                                                              </div>
                                                              </b-form-group>
                                                          </ValidationProvider>
                                                      </b-col>
                                                      <b-col lg="6" sm="6">
                                                          <ValidationProvider name="How To Work" vid="how_to_work" rules="required">
                                                              <b-form-group
                                                              class="row"
                                                              label-cols-sm="12"
                                                              label-for="formData"
                                                              slot-scope="{ valid, errors }"
                                                              >
                                                              <template v-slot:label>
                                                               How To Work
                                                              </template>
                                                              <b-form-input
                                                                  type="text"
                                                                  id="how_to_work"
                                                                  v-model="update.how_to_work"
                                                                  :state="errors[0] ? false : (valid ? true : null)"
                                                                  ></b-form-input>
                                                              <div class="invalid-feedback">
                                                                  {{ errors[0] }}
                                                              </div>
                                                              </b-form-group>
                                                          </ValidationProvider>
                                                      </b-col>
                                                      <b-col lg="6" sm="6">
                                                          <ValidationProvider name="Old App Notice" vid="old_app_notice" rules="required">
                                                              <b-form-group
                                                              class="row"
                                                              label-cols-sm="12"
                                                              label-for="formData"
                                                              slot-scope="{ valid, errors }"
                                                              >
                                                              <template v-slot:label>
                                                               Old App Notice
                                                              </template>
                                                              <b-form-input
                                                                  type="text"
                                                                  id="old_app_notice"
                                                                  v-model="update.old_app_notice"
                                                                  :state="errors[0] ? false : (valid ? true : null)"
                                                                  ></b-form-input>
                                                              <div class="invalid-feedback">
                                                                  {{ errors[0] }}
                                                              </div>
                                                              </b-form-group>
                                                          </ValidationProvider>
                                                      </b-col>
                                                      <b-col lg="6" sm="6">
                                                          <ValidationProvider name="Old App URL" vid="old_app_url" rules="required">
                                                              <b-form-group
                                                              class="row"
                                                              label-cols-sm="12"
                                                              label-for="formData"
                                                              slot-scope="{ valid, errors }"
                                                              >
                                                              <template v-slot:label>
                                                               Old App URL
                                                              </template>
                                                              <b-form-input
                                                                  type="text"
                                                                  id="old_app_url"
                                                                  v-model="update.old_app_url"
                                                                  :state="errors[0] ? false : (valid ? true : null)"
                                                                  ></b-form-input>
                                                              <div class="invalid-feedback">
                                                                  {{ errors[0] }}
                                                              </div>
                                                              </b-form-group>
                                                          </ValidationProvider>
                                                      </b-col>
                                                      <b-col lg="6" sm="6">
                                                          <ValidationProvider name="Invalid Block Count" vid="invalid_block_count" rules="required">
                                                              <b-form-group
                                                              class="row"
                                                              label-cols-sm="12"
                                                              label-for="formData"
                                                              slot-scope="{ valid, errors }"
                                                              >
                                                              <template v-slot:label>
                                                               Invalid Block Count
                                                              </template>
                                                              <b-form-input
                                                                  type="text"
                                                                  id="invalid_block_count"
                                                                  v-model="update.invalid_block_count"
                                                                  :state="errors[0] ? false : (valid ? true : null)"
                                                                  ></b-form-input>
                                                              <div class="invalid-feedback">
                                                                  {{ errors[0] }}
                                                              </div>
                                                              </b-form-group>
                                                          </ValidationProvider>
                                                      </b-col>
                                                      <b-col lg="6" sm="6">
                                                          <ValidationProvider name="Invalid Point Deduct" vid="invalid_point_deduct" rules="required">
                                                              <b-form-group
                                                              class="row"
                                                              label-cols-sm="12"
                                                              label-for="formData"
                                                              slot-scope="{ valid, errors }"
                                                              >
                                                              <template v-slot:label>
                                                               Invalid Point Deduct
                                                              </template>
                                                              <b-form-input
                                                                  type="text"
                                                                  id="invalid_point_deduct"
                                                                  v-model="update.invalid_point_deduct"
                                                                  :state="errors[0] ? false : (valid ? true : null)"
                                                                  ></b-form-input>
                                                              <div class="invalid-feedback">
                                                                  {{ errors[0] }}
                                                              </div>
                                                              </b-form-group>
                                                          </ValidationProvider>
                                                      </b-col>
                                                      <b-col lg="6" sm="6">
                                                          <ValidationProvider name="Total Click" vid="total_click" rules="required">
                                                              <b-form-group
                                                              class="row"
                                                              label-cols-sm="12"
                                                              label-for="formData"
                                                              slot-scope="{ valid, errors }"
                                                              >
                                                              <template v-slot:label>
                                                               Total Click
                                                              </template>
                                                              <b-form-input
                                                                  type="text"
                                                                  id="total_click"
                                                                  v-model="update.total_click"
                                                                  :state="errors[0] ? false : (valid ? true : null)"
                                                                  ></b-form-input>
                                                              <div class="invalid-feedback">
                                                                  {{ errors[0] }}
                                                              </div>
                                                              </b-form-group>
                                                          </ValidationProvider>
                                                      </b-col>

                                                      





                                                      <b-col lg="6" sm="6">
                                                          <ValidationProvider name="App Download link" vid="dlink" rules="required">
                                                              <b-form-group
                                                              class="row"
                                                              label-cols-sm="12"
                                                              label-for="formData"
                                                              slot-scope="{ valid, errors }"
                                                              >
                                                              <template v-slot:label>
                                                              App Download link
                                                              </template>
                                                              <b-form-input
                                                                  id="dlink"
                                                                  v-model="update.dlink"
                                                                  :state="errors[0] ? false : (valid ? true : null)"
                                                                  ></b-form-input>
                                                              <div class="invalid-feedback">
                                                                  {{ errors[0] }}
                                                              </div>
                                                              </b-form-group>
                                                          </ValidationProvider>
                                                      </b-col>
                                                      <b-col lg="6" sm="6">
                                                          <ValidationProvider name="Admin App Download link" vid="admin_dlink" rules="required">
                                                              <b-form-group
                                                              class="row"
                                                              label-cols-sm="12"
                                                              label-for="formData"
                                                              slot-scope="{ valid, errors }"
                                                              >
                                                              <template v-slot:label>
                                                             Admin App Download link
                                                              </template>
                                                              <b-form-input
                                                                  id="admin_dlink"
                                                                  v-model="update.admin_dlink"
                                                                  :state="errors[0] ? false : (valid ? true : null)"
                                                                  ></b-form-input>
                                                              <div class="invalid-feedback">
                                                                  {{ errors[0] }}
                                                              </div>
                                                              </b-form-group>
                                                          </ValidationProvider>
                                                      </b-col>
                                                      <b-col lg="6" sm="6">
                                                          <ValidationProvider name="Main App Version" vid="version" rules="required">
                                                              <b-form-group
                                                              class="row"
                                                              label-cols-sm="12"
                                                              label-for="formData"
                                                              slot-scope="{ valid, errors }"
                                                              >
                                                              <template v-slot:label>
                                                                  Main App Version
                                                              </template>
                                                              <b-form-input
                                                                  id="version"
                                                                  v-model="update.version"
                                                                  :state="errors[0] ? false : (valid ? true : null)"
                                                                  ></b-form-input>http://localhost:8081/other/setting
                                                              <div class="invalid-feedback">
                                                                  {{ errors[0] }}
                                                              </div>
                                                              </b-form-group>
                                                          </ValidationProvider>
                                                      </b-col>
                                                      <b-col lg="6" sm="6">
                                                          <ValidationProvider name="Admin App Version" vid="admin_version" rules="required">
                                                              <b-form-group
                                                              class="row"
                                                              label-cols-sm="12"
                                                              label-for="formData"
                                                              slot-scope="{ valid, errors }"
                                                              >
                                                              <template v-slot:label>
                                                                  Admin App Version
                                                              </template>
                                                              <b-form-input
                                                                  id="admin_version"
                                                                  v-model="update.admin_version"
                                                                  :state="errors[0] ? false : (valid ? true : null)"
                                                                  ></b-form-input>
                                                              <div class="invalid-feedback">
                                                                  {{ errors[0] }}
                                                              </div>
                                                              </b-form-group>
                                                          </ValidationProvider>
                                                      </b-col>
                                                      <b-col lg="6" sm="6">
                                                          <ValidationProvider name="Maintainance Notite   " vid="maintance_notice" rules="required">
                                                              <b-form-group
                                                              class="row"
                                                              label-cols-sm="12"
                                                              label-for="formData"
                                                              slot-scope="{ valid, errors }"
                                                              >
                                                              <template v-slot:label>
                                                                  Maintance Notite 
                                                              </template>
                                                              <b-form-input
                                                                  id="maintance_notice"
                                                                  v-model="update.maintance_notice"
                                                                  :state="errors[0] ? false : (valid ? true : null)"
                                                                  ></b-form-input>
                                                              <div class="invalid-feedback">
                                                                  {{ errors[0] }}
                                                              </div>
                                                              </b-form-group>
                                                          </ValidationProvider>
                                                      </b-col>
                                                      <b-col lg="6" sm="6">
                                                          <ValidationProvider name="Telegram Link" vid="telegram" rules="required">
                                                              <b-form-group
                                                              class="row"
                                                              label-cols-sm="12"
                                                              label-for="formData"
                                                              slot-scope="{ valid, errors }"
                                                              >
                                                              <template v-slot:label>
                                                                  Telegram Link 
                                                              </template>
                                                              <b-form-input
                                                                  id="telegram"
                                                                  v-model="update.telegram"
                                                                  :state="errors[0] ? false : (valid ? true : null)"
                                                                  ></b-form-input>
                                                              <div class="invalid-feedback">
                                                                  {{ errors[0] }}
                                                              </div>
                                                              </b-form-group>
                                                          </ValidationProvider>
                                                      </b-col>
                                                  </div>
                                                  <div class="text-right">
                                                      <b-button type="submit" variant="primary" style="margin-top:40px" class="mr-2">Update</b-button>
                                                  </div>
                                              </b-form>
                                          </ValidationObserver>
                                      
                                  </b-col>                                
                              </div>
                          </CCardBody>
                      </CCard>
                  </b-col>
                  <b-col lg="12" sm="12">
                      <CCard>
                          <CCardHeader>
                              <div class="row">
                                  <div class="col-md-6">
                                      <strong>App Setting's</strong>
                                  </div>
                              </div>
                          </CCardHeader>
                          <CCardBody>
                              <div class='row'>
                                  <b-col lg="12" sm="12">
                                      <ValidationObserver ref="form2"  v-slot="{ handleSubmit, reset }">
                                          <b-form  @submit.prevent="handleSubmit(register(setting))" @reset.prevent="reset" >
                                              <div class='row'>
                                                  <b-col lg="6" sm="6">
                                                      <ValidationProvider name="Main Notice Box" vid="notice" rules="required">
                                                          <b-form-group
                                                          class="row"
                                                          label-cols-sm="12"
                                                          label-for="formData"
                                                          slot-scope="{ valid, errors }"
                                                          >
                                                          <template v-slot:label>
                                                          Main Notice Box
                                                          </template>
                                                          <b-form-textarea
                                                              type="number"
                                                              id="notice"
                                                              v-model="setting.notice"
                                                              :state="errors[0] ? false : (valid ? true : null)"
                                                              ></b-form-textarea>
                                                          <div class="invalid-feedback">
                                                              {{ errors[0] }}
                                                          </div>
                                                          </b-form-group>
                                                      </ValidationProvider>
                                                  </b-col>
                                                  <b-col lg="6" sm="6">
                                                      <ValidationProvider name="Payment Notice Box" vid="payment_notich" rules="required">
                                                          <b-form-group
                                                          class="row"
                                                          label-cols-sm="12"
                                                          label-for="formData"
                                                          slot-scope="{ valid, errors }"
                                                          >
                                                          <template v-slot:label>
                                                          Payment Notice Box
                                                          </template>
                                                          <b-form-textarea
                                                              type="number"
                                                              id="payment_notich"
                                                              v-model="setting.payment_notich"
                                                              :state="errors[0] ? false : (valid ? true : null)"
                                                              ></b-form-textarea>
                                                          <div class="invalid-feedback">
                                                              {{ errors[0] }}
                                                          </div>
                                                          </b-form-group>
                                                      </ValidationProvider>
                                                  </b-col>
                                                  <b-col lg="6" sm="6">
                                                      <ValidationProvider name="Task off Message" vid="task_of_message" rules="required">
                                                          <b-form-group
                                                          class="row"
                                                          label-cols-sm="12"
                                                          label-for="formData"
                                                          slot-scope="{ valid, errors }"
                                                          >
                                                          <template v-slot:label>
                                                            Task off Message
                                                          </template>
                                                          <b-form-textarea
                                                              type="number"
                                                              id="task_of_message"
                                                              v-model="setting.task_of_message"
                                                              :state="errors[0] ? false : (valid ? true : null)"
                                                              ></b-form-textarea>
                                                          <div class="invalid-feedback">
                                                              {{ errors[0] }}
                                                          </div>
                                                          </b-form-group>
                                                      </ValidationProvider>
                                                  </b-col>
                                                  <b-col lg="6" sm="6">
                                                      <ValidationProvider name="Telegram Message" vid="telegram_message" rules="required">
                                                          <b-form-group
                                                          class="row"
                                                          label-cols-sm="12"
                                                          label-for="formData"
                                                          slot-scope="{ valid, errors }"
                                                          >
                                                          <template v-slot:label>
                                                            Telegram Message
                                                          </template>
                                                          <b-form-textarea
                                                              type="number"
                                                              id="telegram_message"
                                                              v-model="setting.telegram_message"
                                                              :state="errors[0] ? false : (valid ? true : null)"
                                                              ></b-form-textarea>
                                                          <div class="invalid-feedback">
                                                              {{ errors[0] }}
                                                          </div>
                                                          </b-form-group>
                                                      </ValidationProvider>
                                                  </b-col>
                                              </div>
                                              <div class="text-right">
                                                  <b-button type="submit" variant="primary" style="margin-top:40px" class="mr-2">Update</b-button>
                                              </div>
                                          </b-form>
                                      </ValidationObserver>
                                  </b-col>                                
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
        update: {
          maintance: false,
          task_on_off: false,
          version: '',
          dlink: ''
        },
        setting: {
          notice: '',
          convert_notice: '',
          payment_notich: ''
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
          RestApi.getData(baseUrl, 'api/app-update/show').then(response => {
              if (response.success) {
                  this.update = {
                      maintance: response.data.maintance == '1' ? true : false,
                      task_on_off: response.data.task_on_off == '1' ? true : false,
                      promotion_on_off: response.data.promotion_on_off == '1' ? true : false,
                      app_cloning_prevent: response.data.app_cloning_prevent == '1' ? true : false,
                      emulator_block: response.data.emulator_block == '1' ? true : false,
                      block_rooted_device: response.data.block_rooted_device == '1' ? true : false,
                      auto_ban_rooted_device: response.data.auto_ban_rooted_device == '1' ? true : false,
                      one_device_one_account: response.data.one_device_one_account == '1' ? true : false,
                      termux_block: response.data.termux_block == '1' ? true : false,
                      developer_mode_prevent: response.data.developer_mode_prevent == '1' ? true : false,
                      main_app_on_off: response.data.main_app_on_off == '1' ? true : false,
                      admin_app_on_off: response.data.admin_app_on_off == '1' ? true : false,
                      telegram: response.data.telegram ,
                      maintance_notice: response.data.telegram ,
                      max_account_same_ip: response.data.max_account_same_ip,
                      version: response.data.version,
                      admin_version: response.data.admin_version,
                      dlink: response.data.dlink,
                      admin_dlink: response.data.admin_dlink,
                      withdraw_limit: response.data.withdraw_limit,
                      package_name: response.data.package_name,
                      how_to_work: response.data.how_to_work,
                      old_app_notice: response.data.old_app_notice,
                      old_app_url: response.data.old_app_url,
                      invalid_block_count: response.data.invalid_block_count,
                      invalid_point_deduct: response.data.invalid_point_deduct,
                      total_click: response.data.total_click,
                  }
                  this.setting = {
                      notice: response.data.notice,
                      convert_notice: response.data.convert_notice,
                      payment_notich: response.data.payment_notich,
                      task_of_message: response.data.task_of_message,
                      telegram_message: response.data.telegram_message
                  }
              }
              this.$store.dispatch('mutedLoad', { loading: false })
          })
      },
      async allUserZero () {
          this.$store.dispatch('mutedLoad', { loading: true })
          let result = null
          result = await RestApi.postData(baseUrl, `api/all-user-zero`)
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
      async register (Obj) {
          this.$store.dispatch('mutedLoad', { loading: true })
          let result = null
          result = await RestApi.postData(baseUrl, `api/app-update/update`, Obj)
          this.$store.dispatch('mutedLoad', { loading: false })
          if (result.success) {
              iziToast.success({
                  title: 'Success',
                  message: result.message
              })
          } else {
              this.$refs.form.setErrors(result.errors)
          }
      }
    }
  }
  </script>
  