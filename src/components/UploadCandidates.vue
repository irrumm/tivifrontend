<template>
  <div>
    <div class="row"><h3>Provide the candidate list</h3></div>
    <hr />
    <div class="alert" v-if="this.error !== null">
      {{ error }}
    </div>
    <div class="row" id="input-row">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="form-group">
          <label>
            <input
              type="file"
              id="file"
              ref="file"
              v-on:change="onChangeFileUpload"
              accept="text/plain"
            />
          </label>
        </div>
      </div>
      <div class="col-3"></div>
    </div>
    <div class="row">
      <div class="form-group">
        <button
          class="btn btn-primary"
          @click="postList()"
          :disabled="this.text.length == 0"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import { ApiBaseUrl } from "@/configuration";

@Component
export default class UploadCandidates extends Vue {
  // TODO: Check if inserted candidate list is in the correct format
  @Prop() file: File | undefined = undefined;
  text = "";
  error: string | null = null;

  async postList(): Promise<void> {
    const authHeaders = {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
    };

    console.log(axios.defaults.baseURL)

    try {
      const response = await axios.post(ApiBaseUrl, this.text, {
        headers: authHeaders,
      });
      if (response.status >= 200 && response.status < 300) {
        this.$emit("nextComponent");
      } else {
        this.error = "An error occured! Please try again.";
        console.log(response.statusText);
      }
    } catch (reason) {
      this.error = "An error occured! Please try again.";
      console.log(reason)
    }
  }

  fileToText(file: File, callback: any) {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      callback(reader.result);
    };
  }

  async onChangeFileUpload(e: Event) {
    this.fileToText(
      (e.target as HTMLInputElement).files![0],
      (text: string) => {
        this.text = text;
      }
    );
  }
}
</script>

<style scoped>
#input-row {
  margin-bottom: 25px;
}
</style>