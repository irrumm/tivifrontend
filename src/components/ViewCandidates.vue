<template>
  <div>
    <h3>Rankings</h3>
    <hr />
    <div class="alert" v-if="this.error !== null">
      {{ error }}
    </div>
    <h2 v-if="this.department === null">Loading...</h2>
    <div v-if="this.department !== null">
      <table class="table">
        <thead>
          <tr>
            <th>Candidate name</th>
            <th>Team</th>
            <th>Vote count</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="candidate in this.department.qualifiedCandidates"
            :key="candidate.name"
          >
            <template v-if="candidate.tied === true">
              <td>
                <strong>{{ candidate.name }}</strong>
              </td>
              <td>
                <strong>{{ candidate.team }}</strong>
              </td>
              <td>
                <strong>{{ candidate.voteCount }}</strong>
              </td>
            </template>
            <template v-else>
              <td>{{ candidate.name }}</td>
              <td>{{ candidate.team }}</td>
              <td>{{ candidate.voteCount }}</td>
            </template>
          </tr>
        </tbody>
        <tbody>
          <tr
            v-for="candidate in this.department.unqualifiedCandidates"
            :key="candidate.name"
          >
            <td>{{ candidate.name }}</td>
            <td>{{ candidate.team }}</td>
            <td>{{ candidate.voteCount }}</td>
          </tr>
        </tbody>
      </table>

      <div class="row">
        <div class="form-group">
          <button
            v-if="this.isTied === true"
            class="btn btn-secondary"
            @click="next()"
          >
            Rearrange tied candidates
          </button>
          <button class="btn btn-primary" @click="skip()">Continue</button>
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
export default class ViewCandidates extends Vue {
  department: IDepartment | null = null;
  isTied: boolean | null = null;
  error: string | null = null;

  async mounted(): Promise<void> {
    const service = new BaseService<IDepartment>("");
    await service.get().then((data) => {
      if (data.data == null) {
        this.error = this.error =
          "Could not proccess request! " +
          data.statusCode +
          " " +
          data.errorMessage;
      } else {
        this.department = data.data! as IDepartment;
        this.isTied =
          this.department!.qualifiedCandidates.filter((c) => c.tied === true)
            .length > 0;
      }
    });
  }

  next(): void {
    this.$emit("nextComponent");
  }
  skip(): void {
    this.$emit("skipComponent");
  }
}
</script>
