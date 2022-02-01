<template>
  <div class="row" v-if="this.department !== null">
    <div class="col-3"></div>
    <div class="col-6">
      <h3>Final standings</h3>  
      <table class="table">
        <thead>
          <tr>
            <th>Council members</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="candidate in this.department.council"
            :key="candidate.name"
          >
            <td>
              <strong>{{ candidate.name }}</strong> | Votes: <strong>{{ candidate.voteCount }}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            <th>Vice members</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="candidate in this.department.qualifiedCandidates"
            :key="candidate.name"
          >
            <td>
              <strong>{{ candidate.name }}</strong> | Votes: <strong>{{ candidate.voteCount }}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            <th>Unqualified candidates</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="candidate in this.department.unqualifiedCandidates"
            :key="candidate.name"
          >
            <td>
              <strong>{{ candidate.name }}</strong> | Votes: <strong>{{ candidate.voteCount }}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-3"></div>
    <div class="row">
      <div class="form-group">
        <button class="btn btn-primary" @click="goHome()" style="margin-right: 10px">Back to home</button>
        <button class="btn btn-secondary" @click="download()">Download</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { BaseService } from "@/services/base-service";
import { IDepartment } from "@/domain/IDepartment";
import { ICandidate } from "@/domain/ICandidate";

@Component
export default class ViewFinal extends Vue {
  @Prop() department: IDepartment | null = null;

  mounted(): void {
    const service = new BaseService<IDepartment>("");
    service.get().then((data) => {
      this.department = data.data! as IDepartment;
    });
  }

  goHome(): void {
    this.$emit("home");
  }

  private removeTied(item: ICandidate): void {
      delete item.tied;
  }

  download(): void {
    // remove unimportant properties
    this.department!.council.forEach(this.removeTied);
    this.department!.qualifiedCandidates.forEach(this.removeTied);
    this.department!.unqualifiedCandidates.forEach(this.removeTied);
    delete this.department?.seatsInCouncil;

    // create downloadable .json file
    let json = JSON.stringify(this.department, null, 4);
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/json,' + encodeURIComponent(json));
    element.setAttribute('download', "ranking.json");
    
    element.style.display = 'none';
    document.body.appendChild(element);
    
    element.click();
    document.body.removeChild(element);
  }
}
</script>
