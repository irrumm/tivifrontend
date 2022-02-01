<template>
  <div>
    <div class="row"><h3>Provide the candidate list</h3></div>
    <div class="row" style="margin-bottom: 25px;">
      <hr />
      <div class="col-3"></div>
      <div class="col-6">
        <div class="form-group">
          <label class="control-label" for="list"></label>
          <textarea
            class="form-control"
            type="text"
            id="list"
            name="list"
            v-model="list"
            rows="20"
          />
        </div>
      </div>
      <div class="col-3"></div>
    </div>
    <div class="row">
      <div class="form-group">
        <button class="btn btn-primary" @click="postList()">Submit</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ApiBaseUrl } from "../configuration";
import axios from "axios";

@Component
export default class UploadCandidates extends Vue {
  // TODO: Check if inserted candidate list is in the correct format
  // TODO: Provide the possibility to upload candidate list as a file
  @Prop() private list!: string;

  async postList(): Promise<void> {
    let authHeaders = {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
    };

    try {
      const response = await axios.post(ApiBaseUrl, this.list, {
        headers: authHeaders,
      });
      if (response.status >= 200 && response.status < 300) {
        this.$emit('nextComponent')
      }
    } catch (reason) {
      console.log(reason);
    }
  }
}
</script>