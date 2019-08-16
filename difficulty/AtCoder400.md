---
layout: default
title: NMLibrary's page
---
# 難易度表: AtCoder400
<ul>
{% for problem in site.data.problems %}
  <li class="problem">
    <a href="{{ problem.url }}">
      {{ problem.contest }}{{ problem.contest-number }}
      {{ problem.id-in-contest}}
      - {{ problem.title }}
    </a>
    <p>
      {{ problem.comment }}
    </p>
  </li>
{% endfor %}
</ul>
<table class="difficulty">
{% for prob in site.data.problems %}
  <tr>
    <td class="difficulty-data">
      <a href="{{ prob.url }}">
        {{ prob.contest }}{{ prob.contest-number }}
        {{ prob.id-in-contest}}
        - {{ prob.title }}
      </a>
    </td>
    <td class="difficulty-data">
      {{ prob.comment }}
    </td>
  </tr>
{% endfor %}
</table>
