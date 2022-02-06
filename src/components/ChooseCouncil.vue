<template>
  <div>
    <div class="alert" v-if="this.error !== null">
      {{ error }}
    </div>
    <h2 v-if="this.department === null">Loading...</h2>
    <div v-if="this.department !== null">
      <table class="table">
        <thead>
          <tr>
            <th>Chosen council members</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="candidate in this.department.council"
            :key="candidate.name"
          >
            <td>{{ candidate.name }}</td>
          </tr>
        </tbody>
      </table>

      <div class="row">
        <div class="form-group">
          <button class="btn btn-primary" @click="next()">Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BaseService } from "@/services/base-service";
import { IDepartment } from "@/domain/IDepartment";

@Component
export default class ChooseCouncil extends Vue {
  department: IDepartment | null = null;
  error: string | null = null;

  async mounted(): Promise<void> {
    const service = new BaseService<IDepartment>("choose-council");
    await service.get().then((data) => {
      if (data.data == null) {
        this.error =
          "Could not proccess request! " +
          data.statusCode +
          " " +
          data.errorMessage;
      } else {
        this.department = data.data! as IDepartment;
      }
    });
  }
  next() {
    this.$emit("nextComponent");
  }
}
</script>
