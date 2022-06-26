<template>
  <div>
    <div class="navbar">
      <div></div>
      <div class="nav-links">
        <span class="alarm-logo" @click="startEmergency" v-if="!isEmergency">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADfElEQVR4nO2bz0sVURTHP0a/tKeb7GVussVTV0lQUavS/oSK9N9oEwgGQbYI1y0qt4bUInm0lSBFCLNMoUXRJmohRVkZpvhei3uGsUczc2fmzr0TzgcuI++dOd9zz733zJ2ZJxQ4ZRZ45joIl9SlOWOXS/E8UCTAdQCuKRLgOgDX7HasP4Pjq0AcuoAW10Fo0IKK1ShdwCawBJRNOzdIGRXjJnDUpOMWcVwnv0nwOu/FaHy2HgJei8Ab4IhpgRSU+Tu2jiyFvCwvE28mtAFDwD3gObACbEhbkc/uAoNAa8yYlrE4O7cLLmjYdwPjwBr+3j+qrQH3gYqG/5ckG5BUlEV4EWgKsGkGxlAFqQ7UgHlgBDgP9AAHpPXKZ9eBF/iJ2ABuA/sDNJpQU3+BnNWlCv5SqQGTqJmgSw/wUM6tA3Pkq+aEcgK1puvAO+B0Cl9ngPfi6wNwPHV0GVPB7/w0cNCAz3bgKX4SMqvwaWnGn/bTwB6DvvfiJ2EO2GfQtzHG8Ke9iZFvpB1/OdzIwH8qulHVvka6NR/FWdH4Qc6WwjhqZCYtaD0SrTsWtLRoQ21casS71CWlF5WAn0DJgl4kQ6iA5i1qLojmlbSOTDwRGpDjlAFfunhaA6FWGphIQJ8cbb7g8LT6Qq00MJGAY3L8ZMCXLh8btJ3yG7UebRakkmiuW9QMxNXrLSO6Lh6LdwK3UNvmX9KWgFEc3vHNEvxwIqq4xRmJQWA1RGsV/Uubjm5kv7wZUIsQMsEQMIHaOE2hHoCUpPUDVfnuAQau74KNfmmNRCfwXeyuhdgN48+EqL2+81frHjqBjIrNYw1/VbG9aUDXCjqBLIrNOQ1//WL7yoCuFXQCWUd/r9CKf7OTVjcSW5fBsGLUSNBT5kywlYC3cjypYXuq4ZxMsZWAqhyvath6NtVQqxyhsxY7gG9iNxxiNyI2X4HDBnStoBvIZWBLbKuoal9CFb0LwBP5bgu4aFA3c+IEcmmbfVDT6Xxc3UyJG4hnPwd8AT7L30n9OMdU4E4SsON/JVYkwHUArikS4DoA1xQJSHje9mdtHro/gAqyT+sn0YuZpLeeudiA/IPY/Un7Y2mr9+4hJB6Qoga4DsA1cRKQpvBl3Rrj0S6IcdZwXgtfEFp9S1IE81L4gog1UEUNcB2Aa5Isgf+tFoQSZwbMZBaFeXb0P2TH4g/XCk5XYQ8JBAAAAABJRU5ErkJggg=="
            width="38"
          />
        </span>
        <span class="alarm-logo" @click="endEmergency" v-else>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAFHklEQVR4nO2bf0icdRzHX895/jq906hzus2l2Z0OXE5bQYU1x4jAbcZSarVgEc1Bo7EIhBZDkmQUSMUG4ub2T1TQCoYjWJCbmzLJ4TZdTFcmWGxuSpPTEz31nv547vxB6vPcPd97HuF8wQPe8f1+Pp/v2+/38/083+c5WMVU2oArZgdhJnLgMg2Lmc5XAqsCmB2A2awKYHYAZmM12X8rJu8CoZAF2MwOQgM2lFiFkgVMAd1AmmjjAklDiXEKeFykYVvAsMzKFSE4+GCMwmerE+gKOLgNZIh2oIM0FsaWHilHekRwAHuAk8BvwAPAF7geBL5rAN4A7CHYnf+fj+jg5zu8FXDYqaG9G2gEvMzV/mqXFzgFuDTYvx7oc4swlqYUaocAacAFlDpiM4tvZYlADXAIsEoSFGXGUFYQR7HLSkaKxPpUpQz5+6GfQY/M5T+mOXfTR+fATNDGFPAlcBSYWCL+m8A08ArKTAqJcAVQwwX8BORLElQUxVGzKwH3mhhNnXvvz/DJuQl+vO5DVqRtB3YD90QHGgkBClFmhzPHaeHbd5N4Niu8equ9f5o3G730D/sB/gFKUXKQMEQL4EI55HCW5Fr5YX8yjybpczE8JlPeMEbLnWlQRHgGGNQdaQCRAiSiZPL8klwrFz6wE6ttxqvim4aXvx4NitAObAUmRdgWFCIAx4BXc5wWfjlkJzlenLYxFtixKY6znT5GxuX1gB+4JMK2qCjdwO+ShLW9yh72mlfj6l/TvPDFKLLMGMpy070URN0OVwHWiqK4iA0e4LknrOzeHAeQjLI16kbEDHAA9yQJW0+1Q/NWFy49gzNsrPaAUiylA2N67ImYAaWArSgzJuKDB8hLj6EwMwYgKeBbFyIE2AZQVhAnwJQ25vnapteWCAEKAIpdxh0uzfNVoNeWCAGyAdamRKqq/j/rUmd9Zeu1JUIAB8DaVOPOV9fN+UrRa0tE1Mq+JLDwUWOer3i9tgw/Fb474uf4pUmauqboG/IDkOO0sKsgloNb48lIMfakPihlG/D8Em1ageJlbMgAcv0jqs6+v+aj8ptxPBOLn4Q7EiQa9tp4fYv6jiIdeDj75zLNVMcVnAH+ZYwIObf/rsPHW6e9yDKUbXdyeN8GtmxyANDR5aHuzABNzUPsafQCaBJBA6rjErFwVWfA3RE/edUeRidkjn30JFX7Fz+2r63v50hdH44Eid5PHaQ7ll4OGmeAKoYsuBMtk4xOyJRtdy45eICPD2Szo+QxPBMyxy8KudtVxRABzndNAXB43wbVth++ozzPON89FdGYghgiQO995ZDz6XyHattgXvhzaLnlKw5DBLBI2pepLBv7rNQQAVxpiptr3R7Vth2BNsE+kcYQLzufigWg7syAatu60wML+kQaQwQ4WBJPSqJEU/MQtfX9S7arOdHPzy3DpNok3n9Jd5WrCUMESHdYOLnXhkWCI3V97Ky8wcX2h4yNzzDqneHXq/9S+t4Njn7Vh0WCU2/bWLNMDSASQwqhIGc7fVQ0eJdvU5nEa4XCSmFVDL3zKC+aG5jbnUtycjJ2ux23O3f2ey2DF4lp7wjVfvb5gs/lFWWmxBH1b4mtCmB2AGazKoDZAZhN1AsQLm1of+HJqCusX56EW0Wt1Pd7Qx6PrkLoxWLdj+aEcPlKc9h9oz4HRL0AobASE5/uhBhK0lipiW8pNI0t5CTYc/tO6KEYSN5Gd0jtoz4HRL0AUZ8DQpkBrWEGYgZR/YPskPgPVbmbra+aBYgAAAAASUVORK5CYII="
            width="38"
          /> </span
        >&nbsp;
        <span>
          <router-link class="navbar-item" to="/admin/events"
            >Events</router-link
          > </span
        >&nbsp;
        <span>
          <router-link class="navbar-item" to="/admin/create"
            >Create</router-link
          > </span
        >&nbsp;
        <span @click="logout">
          <a class="navbar-item">Logout</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEmergency: false,
      emergencyText: "",
    };
  },
  methods: {
    logout() {
      this.$router.push("/login");
    },
    startEmergency() {
      let emergencyText = prompt("Enter emergency text");
      if (emergencyText) {
        this.$store.state.socket.emit("start-emergency", { emergencyText });
        this.$store.dispatch("startEmergency", { emergencyText });
      }
    },
    endEmergency() {
      this.$store.state.socket.emit("end-emergency");
    },
  },
  mounted() {
    this.$store.state.socket.on("emergency-info", (emergencyInfo) => {
      this.isEmergency = emergencyInfo.isEmergency;
      this.emergencyText = emergencyInfo.emergencyText;
    });

    this.$store.state.socket.on("start-emergency", () => {
      this.isEmergency = true;
    });

    this.$store.state.socket.on("end-emergency", () => {
      this.isEmergency = false;
    });
  },
};
</script>

<style lang="css" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
}

.nav-links {
  float: right;
  display: flex;
  align-items: center;
}

.navbar-item {
  color: black;
  text-decoration: none;
}

.navbar-item:hover {
  cursor: pointer;
  text-decoration: underline;
}

.alarm-logo {
  cursor: pointer;
}
</style>