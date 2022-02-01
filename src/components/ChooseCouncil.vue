<template>
<div>
    <h2 v-if="this.department === null">Loading...</h2>
        <table class="table" v-if="this.department !== null">
            <thead>
                <tr>
                    <th>Chosen council members</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="candidate in this.department.council" :key="candidate.name">
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { BaseService } from "@/services/base-service";
import { IDepartment } from "@/domain/IDepartment";

@Component
export default class ChooseCouncil extends Vue {
    @Prop() department: IDepartment | null = null;

    async mounted(): Promise<void> {
        const service = new BaseService<IDepartment>("choose-council",);
        await service.get().then((data) => {
            this.department = data.data! as IDepartment;
        });
    }
    next() {
        this.$emit('nextComponent')
    }
}
</script>
